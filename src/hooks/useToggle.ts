import { useCallback, useState } from "react";

export const useToggle = (
  val?: boolean
): [boolean, () => void, (val: boolean) => void] => {
  const [value, setValue] = useState(val || false);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, toggle, setValue];
};
