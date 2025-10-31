"use client";

import { useEffect, useRef, useState } from "react";
import { ProtoMono } from "../fonts";
import {
  type GraduatingClass,
  GRADUATING_CLASS_OPTIONS,
  formatGraduatingClass,
} from "./types";

interface GraduatingClassFieldProps {
  value: GraduatingClass | null;
  onChange: (value: GraduatingClass) => void;
  hasChanges: boolean;
}

export function GraduatingClassField({
  value,
  onChange,
  hasChanges,
}: GraduatingClassFieldProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Scroll selected item into view when navigating with keyboard
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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

  const handleSelect = (optionValue: GraduatingClass) => {
    onChange(optionValue);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!showDropdown) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setShowDropdown(true);
        const currentIndex = value
          ? GRADUATING_CLASS_OPTIONS.findIndex((opt) => opt.value === value)
          : 0;
        setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const selectedOption = GRADUATING_CLASS_OPTIONS[selectedIndex];
      if (selectedOption) {
        handleSelect(selectedOption.value);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < GRADUATING_CLASS_OPTIONS.length - 1 ? prev + 1 : prev,
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
        Graduating Class
      </label>
      <div className="flex gap-2">
        {value && !showDropdown ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowDropdown(true);
              const currentIndex = GRADUATING_CLASS_OPTIONS.findIndex(
                (opt) => opt.value === value,
              );
              setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
            }}
            className={`relative flex flex-1 cursor-pointer items-center gap-2 rounded-lg border ${
              hasChanges ? "border-red-500" : "border-[var(--color-light-30)]"
            } bg-[var(--color-dark)] px-4 py-2 text-left hover:bg-[var(--color-light-10)]`}
            onKeyDown={handleKeyDown}
          >
            <span className={`flex-1 ${ProtoMono.className}`}>
              <span className="text-[var(--color-compsigh)]">
                {formatGraduatingClass(value)}
              </span>
            </span>
            {hasChanges && (
              <span className="rounded border border-red-500 bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                Unsaved changes
              </span>
            )}
          </button>
        ) : (
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => {
                setShowDropdown(true);
                const currentIndex = value
                  ? GRADUATING_CLASS_OPTIONS.findIndex(
                      (opt) => opt.value === value,
                    )
                  : 0;
                setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
              }}
              onFocus={() => {
                setShowDropdown(true);
                const currentIndex = value
                  ? GRADUATING_CLASS_OPTIONS.findIndex(
                      (opt) => opt.value === value,
                    )
                  : 0;
                setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
              }}
              onKeyDown={handleKeyDown}
              className={`w-full rounded-lg border ${
                hasChanges ? "border-red-500" : "border-[var(--color-light-30)]"
              } bg-[var(--color-dark)] px-4 py-2 pr-40 text-left text-[var(--color-light)] focus:border-[var(--color-compsigh)] focus:outline-none ${ProtoMono.className}`}
            >
              {value ? (
                formatGraduatingClass(value)
              ) : (
                <span className="text-[var(--color-light-50)]">
                  Select a class
                </span>
              )}
            </button>
            {hasChanges && !showDropdown && (
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-red-500 bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                Unsaved changes
              </span>
            )}
            {showDropdown && (
              <div className="absolute left-0 top-full z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-[var(--color-light-30)] bg-[var(--color-dark)] shadow-lg">
                {GRADUATING_CLASS_OPTIONS.map((option, index) => (
                  <button
                    key={option.value}
                    ref={index === selectedIndex ? selectedRef : null}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full px-4 py-2 text-left hover:bg-[var(--color-light-10)] ${ProtoMono.className} ${
                      index === selectedIndex
                        ? "bg-[var(--color-light-10)]"
                        : ""
                    } ${
                      value === option.value
                        ? "text-[var(--color-compsigh)]"
                        : "text-[var(--color-light)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

