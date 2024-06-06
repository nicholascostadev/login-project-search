import { useEffect } from "react";

type UseAddDocumentKeydownProps = {
  condition: (e: KeyboardEvent) => boolean;
  callback: (e: KeyboardEvent) => void;
};

export function useAddDocumentKeydown({
  condition,
  callback,
}: UseAddDocumentKeydownProps) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (condition(e)) {
        callback(e);
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [callback, condition]);
}
