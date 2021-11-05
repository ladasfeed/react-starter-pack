import { useEffect, useState } from "react";

type useStateDebouncePropsType<T> = {
  initial: T;
  delay: number;
};
type useStateDebounceType<T> = [
  val: T,
  set: (val: T) => void,
  setImmediate: (val: T) => void
];

export function useStateDebounce<T>({
  initial,
  delay,
}: useStateDebouncePropsType<T>): useStateDebounceType<T> {
  const [value, setValue] = useState<T>(initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(initial);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return [debouncedValue, setValue, setDebouncedValue];
}
