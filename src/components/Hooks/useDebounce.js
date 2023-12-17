import { useState, useEffect } from "react";

// ---------- Customize new hooks based on the basic hooks provided by React ---------- //
// ---------- Debounce Technique ---------- //
function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
