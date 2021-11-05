import { useEffect } from "react";

export const useBlurred = (
  ref: any,
  setClose: (value: boolean) => void,
  opened: boolean
) => {
  const handlerBlur = (event: FocusEvent) => {
    const { current } = ref;
    if (current && !current.contains(event.target) && opened) {
      setClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlerBlur);
    return () => {
      document.removeEventListener("mousedown", handlerBlur);
    };
  }, [opened]);
};
