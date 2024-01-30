import { useEffect, useState } from "react";

export const useDebounceHook = ({ input, value }) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, value);

    return () => {
      clearTimeout(timer);
    };
  }, [input, value]);

  return { debouncedValue, setDebouncedValue };
};
