"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/navbar";
import { LogoBrand } from "../_components/logo-brand";
import { NameField } from "../_components/name-field";
import { EmailField } from "../_components/email-field";
import { GraduatingClassField } from "../_components/graduating-class-field";
import { ReferralField } from "../_components/referral-field";
import { ActionButtons } from "../_components/action-buttons";
import { SuccessMessage } from "../_components/success-message";
import { RegistrationNotice } from "../_components/registration-notice";
import { AdminNotice } from "../_components/admin-notice";
import { useConfetti } from "../_components/hooks/use-confetti";
import type { GraduatingClass } from "../_components/types";

export default function ParticipantPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const utils = api.useUtils();
  const { triggerFromElement, triggerFirstVisitConfetti } = useConfetti();
  const confettiTriggeredRef = useRef<string | null>(null);
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { data: user, isLoading } = api.participant.getCurrentUser.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );

  const updateName = api.participant.updateName.useMutation({
    onSuccess: () => {
      void utils.participant.getCurrentUser.invalidate();
    },
  });

  const updateGraduatingClass =
    api.participant.updateGraduatingClass.useMutation({
      onSuccess: () => {
        void utils.participant.getCurrentUser.invalidate();
      },
    });

  const updateReferral = api.participant.updateReferral.useMutation({
    onSuccess: () => {
      void utils.participant.getCurrentUser.invalidate();
      void utils.participant.getReferralStats.invalidate();
    },
  });

  const { data: referralStats } = api.participant.getReferralStats.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: allUsers } = api.participant.getAllUsers.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [originalValues, setOriginalValues] = useState({
    name: "",
    graduatingClass: null as GraduatingClass | null,
    referralId: null as string | null,
  });

  const [name, setName] = useState("");
  const [graduatingClass, setGraduatingClass] = useState<GraduatingClass | null>(null);
  const [referralId, setReferralId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const newOriginalValues = {
        name: user.name ?? "",
        graduatingClass: (user.graduatingClass ?? null) as GraduatingClass | null,
        referralId: user.referralId ?? null,
      };
      setTimeout(() => {
        setOriginalValues(newOriginalValues);
        setName(newOriginalValues.name);
        setGraduatingClass(newOriginalValues.graduatingClass);
        setReferralId(newOriginalValues.referralId);
      }, 0);
    }
  }, [user]);

  const handleFirstVisit = useEffectEvent(() => {
    triggerFirstVisitConfetti();
  });

  useEffect(() => {
    if (!user) return;

    const hasVisited = user.hasVisitedParticipantPage ?? false;
    const alreadyTriggered = confettiTriggeredRef.current === user.id;

    if (!hasVisited && !alreadyTriggered) {
      confettiTriggeredRef.current = user.id;
      handleFirstVisit();
    }

    if (confettiTriggeredRef.current && confettiTriggeredRef.current !== user.id) {
      confettiTriggeredRef.current = null;
    }
  }, [user, handleFirstVisit]);

  const hasChanges = useMemo(() => {
    return (
      name !== originalValues.name ||
      graduatingClass !== originalValues.graduatingClass ||
      referralId !== originalValues.referralId
    );
  }, [name, graduatingClass, referralId, originalValues]);

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      const promises = [];
      if (name !== originalValues.name) {
        promises.push(updateName.mutateAsync({ name }));
      }
      if (graduatingClass !== originalValues.graduatingClass) {
        if (graduatingClass !== null) {
          promises.push(updateGraduatingClass.mutateAsync({ graduatingClass }));
        }
      }
      if (referralId !== originalValues.referralId) {
        promises.push(updateReferral.mutateAsync({ referralId }));
      }

      await Promise.all(promises);

      setOriginalValues({
        name,
        graduatingClass,
        referralId,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      triggerFromElement(saveButtonRef.current);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleReset = () => {
    setName(originalValues.name);
    setGraduatingClass(originalValues.graduatingClass);
    setReferralId(originalValues.referralId);
  };

  const handleGraduatingClassChange = (value: GraduatingClass) => {
    setGraduatingClass(value);
  };

  const handleReferralChange = (value: string | null) => {
    setReferralId(value);
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-2xl">Loading...</div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!user) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-2xl">Error loading user data</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <LogoBrand />
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-8 sm:pt-20">
        <h1 className="mb-8 text-4xl font-bold">Participant Dashboard</h1>

        <RegistrationNotice />

        {session?.user?.isAdmin && <AdminNotice />}

        <div className="space-y-6">
          <NameField
            value={name}
            onChange={setName}
            hasChanges={name !== originalValues.name}
          />

          <GraduatingClassField
            value={graduatingClass}
            onChange={handleGraduatingClassChange}
            hasChanges={graduatingClass !== originalValues.graduatingClass}
          />

          <EmailField value={user.email ?? ""} />

          <ReferralField
            value={referralId}
            onChange={handleReferralChange}
            hasChanges={referralId !== originalValues.referralId}
            allUsers={allUsers}
            referralStats={referralStats}
          />

          <ActionButtons
            onReset={handleReset}
            onSave={handleSave}
            hasChanges={hasChanges}
            isSaving={updateName.isPending || updateGraduatingClass.isPending}
            saveButtonRef={saveButtonRef}
          />

          <SuccessMessage show={showSuccess} />
        </div>
      </div>
    </main>
  );
}
