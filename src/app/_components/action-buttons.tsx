interface ActionButtonsProps {
  onReset: () => void;
  onSave: () => void;
  hasChanges: boolean;
  isSaving: boolean;
  saveButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function ActionButtons({
  onReset,
  onSave,
  hasChanges,
  isSaving,
  saveButtonRef,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 pt-4">
      <button
        onClick={onReset}
        disabled={!hasChanges}
        className="flex-1 cursor-pointer rounded-lg border border-[hsla(38deg,100%,90%,0.5)] px-6 py-3 font-medium text-[var(--color-light)] hover:bg-[hsla(38deg,100%,90%,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reset
      </button>
      <button
        ref={saveButtonRef}
        onClick={onSave}
        disabled={!hasChanges || isSaving}
        className="flex-1 cursor-pointer rounded-xl border-2 border-[var(--color-compsigh)] bg-[var(--black)] px-6 py-3 font-medium text-[var(--color-light)] hover:bg-[var(--color-compsigh)] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
