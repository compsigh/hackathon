interface SuccessMessageProps {
  show: boolean;
}

export function SuccessMessage({ show }: SuccessMessageProps) {
  if (!show) return null;

  return (
    <div
      className="mt-4 rounded-lg border-2 border-green-500 bg-green-500/10 px-4 py-3 text-green-400"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">Changes saved successfully!</span>
      </div>
    </div>
  );
}

