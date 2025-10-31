import { useState, useEffect } from "react";

export function useShare() {
  const [copied, setCopied] = useState(false);
  const [hasShareAPI, setHasShareAPI] = useState(false);

  useEffect(() => {
    setHasShareAPI(
      typeof navigator !== "undefined" && "share" in navigator,
    );
  }, []);

  const share = async (url: string, title: string, text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
        return false;
      }
    } else {
      // Fallback to clipboard copy
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return true;
      } catch (error) {
        console.error("Failed to copy:", error);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          // eslint-disable-next-line deprecation/deprecation -- Fallback for older browsers
          document.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          return true;
        } catch (err) {
          console.error("Fallback copy failed:", err);
          return false;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    }
  };

  return {
    share,
    copied,
    hasShareAPI,
  };
}

