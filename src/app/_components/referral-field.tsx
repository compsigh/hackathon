"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { ProtoMono } from "../fonts";

interface User {
  id: string;
  name: string | null;
  emailPrefix: string;
}

interface ReferralFieldProps {
  value: string | null;
  onChange: (referralId: string | null) => void;
  hasChanges: boolean;
  allUsers: User[] | undefined;
  referralStats?: { referralCount: number } | null;
}

export function ReferralField({
  value,
  onChange,
  hasChanges,
  allUsers,
  referralStats,
}: ReferralFieldProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const selectedReferrer = useMemo(() => {
    if (!value || !allUsers) return null;
    const user = allUsers.find((u) => u.id === value);
    return user
      ? { id: user.id, name: user.name, emailPrefix: user.emailPrefix }
      : null;
  }, [value, allUsers]);

  const searchResults = useMemo(() => {
    if (!allUsers || !showDropdown) return [];

    const searchableUsers = allUsers.map((user) => ({
      ...user,
      searchableText: `${user.name ?? ""} ${user.emailPrefix}`.toLowerCase(),
    }));

    if (!searchQuery || searchQuery.trim().length === 0) {
      return searchableUsers.sort((a, b) => {
        const nameA = a.name ?? "";
        const nameB = b.name ?? "";
        return nameA.localeCompare(nameB);
      });
    }

    const fuse = new Fuse(searchableUsers, {
      keys: [
        { name: "name", weight: 0.6 },
        { name: "emailPrefix", weight: 0.4 },
        { name: "searchableText", weight: 0.3 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 1,
    });

    const results = fuse.search(searchQuery.trim());
    return results.slice(0, 10).map((result) => result.item);
  }, [allUsers, searchQuery, showDropdown]);

  useEffect(() => {
    if (showDropdown && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showDropdown]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (referrer: User) => {
    onChange(referrer.id);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || !searchResults || searchResults.length === 0) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const topResult = searchResults[selectedIndex];
      if (topResult) {
        handleSelect(topResult);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium">
        Who referred you?
      </label>
      <div className="flex gap-2">
        {selectedReferrer && !showDropdown ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowDropdown(true);
              setSearchQuery("");
              requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
              });
            }}
            className={`relative flex flex-1 cursor-pointer items-center gap-2 rounded-lg border ${
              hasChanges ? "border-red-500" : "border-[var(--color-light-30)]"
            } bg-[var(--color-dark)] px-4 py-2 text-left hover:bg-[var(--color-light-10)]`}
          >
            <span className={`flex-1 ${ProtoMono.className}`}>
              <span className="text-[var(--color-compsigh)]">
                {selectedReferrer.name ?? "—"}
              </span>{" "}
              <span className="text-[var(--color-light-50)]">
                {selectedReferrer.emailPrefix}
              </span>
            </span>
            {hasChanges && (
              <span className="rounded border border-red-500 bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                Unsaved changes
              </span>
            )}
          </button>
        ) : (
          <>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search by name or email..."
                className={`w-full rounded-lg border ${
                  hasChanges
                    ? "border-red-500"
                    : "border-[var(--color-light-30)]"
                } bg-[var(--color-dark)] px-4 py-2 pr-40 text-[var(--color-light)] focus:border-[var(--color-compsigh)] focus:outline-none ${ProtoMono.className}`}
              />
              {hasChanges && !showDropdown && (
                <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border border-red-500 bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                  Unsaved changes
                </span>
              )}
            </div>
            {showDropdown && searchResults && searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] shadow-lg"
              >
                {searchResults.map((result, index) => (
                  <button
                    key={result.id}
                    ref={index === selectedIndex ? selectedRef : null}
                    type="button"
                    onClick={() => handleSelect(result)}
                    className={`w-full px-4 py-2 text-left hover:bg-[var(--color-light-10)] ${ProtoMono.className} ${
                      index === selectedIndex
                        ? "bg-[var(--color-light-10)]"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        result.id === value
                          ? "text-[var(--color-compsigh)]"
                          : "text-[var(--color-light)]"
                      }
                    >
                      {result.name ?? "—"}
                    </span>{" "}
                    <span className="text-[var(--color-light-50)]">
                      {result.emailPrefix}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {referralStats && referralStats.referralCount > 0 && (
        <p className="mt-2 text-sm text-[var(--color-light-50)]">
          {referralStats.referralCount}{" "}
          {referralStats.referralCount === 1 ? "person is" : "people are"}{" "}
          referring you
        </p>
      )}
    </div>
  );
}
