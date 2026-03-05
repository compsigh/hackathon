import { Form, useActionData } from "react-router";
import type { Route } from "./+types/_admin.config";
import { db } from "~/db/db.server";
import { hackathonConfig } from "~/db/schema.server";
import { eq } from "drizzle-orm";

export async function loader({}: Route.LoaderArgs) {
  let [config] = await db.select().from(hackathonConfig).limit(1);

  // Auto-create singleton if missing
  if (!config) {
    await db.insert(hackathonConfig).values({});
    [config] = await db.select().from(hackathonConfig).limit(1);
  }

  return { config: config! };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const state = String(formData.get("state")) as "pre" | "during" | "post";
  const hackathonName = String(formData.get("hackathonName") ?? "").trim();
  const maxTeamSize = Number(formData.get("maxTeamSize"));
  const startTime = formData.get("startTime")
    ? new Date(String(formData.get("startTime")))
    : null;
  const endTime = formData.get("endTime")
    ? new Date(String(formData.get("endTime")))
    : null;

  const [existing] = await db.select().from(hackathonConfig).limit(1);
  if (!existing) return { error: "Config not found" };

  await db
    .update(hackathonConfig)
    .set({
      state,
      hackathonName: hackathonName || "DEPLOY/25",
      maxTeamSize: maxTeamSize || 4,
      startTime,
      endTime,
    })
    .where(eq(hackathonConfig.id, existing.id));

  return { success: true };
}

export default function AdminConfigPage({ loaderData }: Route.ComponentProps) {
  const { config } = loaderData;
  const actionData = useActionData<typeof action>();

  function formatDateForInput(date: Date | null | undefined) {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Hackathon Config</h1>

      {actionData?.success && (
        <div className="rounded-lg border border-green-400/50 bg-green-400/10 p-4 text-sm text-green-400">
          Configuration updated successfully.
        </div>
      )}
      {actionData?.error && (
        <div className="rounded-lg border border-red-400/50 bg-red-400/10 p-4 text-sm text-red-400">
          {actionData.error}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-(--color-light-50)">
            Hackathon State
          </label>
          <select
            name="state"
            defaultValue={config.state}
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          >
            <option value="pre">Pre-hackathon</option>
            <option value="during">During hackathon</option>
            <option value="post">Post-hackathon</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-(--color-light-50)">
            Hackathon Name
          </label>
          <input
            name="hackathonName"
            type="text"
            defaultValue={config.hackathonName}
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-(--color-light-50)">
            Max Team Size
          </label>
          <input
            name="maxTeamSize"
            type="number"
            min="2"
            max="10"
            defaultValue={config.maxTeamSize}
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-(--color-light-50)">
            Start Time
          </label>
          <input
            name="startTime"
            type="datetime-local"
            defaultValue={formatDateForInput(config.startTime)}
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-(--color-light-50)">
            End Time
          </label>
          <input
            name="endTime"
            type="datetime-local"
            defaultValue={formatDateForInput(config.endTime)}
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-(--color-compsigh) px-4 py-2 font-medium text-(--color-dark) transition-opacity hover:opacity-90"
        >
          Save Configuration
        </button>
      </Form>
    </div>
  );
}
