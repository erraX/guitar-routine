import { useEffect } from "react";

export const useConfirmExit = ({ shouldConfirm = true }: { shouldConfirm?: boolean }) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const confirmExit = (e: any) => {
      if (!shouldConfirm) {
        return;
      }

      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", confirmExit);
    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, [shouldConfirm]);
};