import { useState, useEffect, useCallback } from "react";

export const useTableData = (asyncFunction, functionArgs = [], immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  // The execute function wraps our asyncFunction
  // and handles setting state for pending, value and error.
  // useCallback ensures that the useEffect is not called on every render,
  // only if the the asyncFunction changes.
  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction(...functionArgs)
      .then(res => setValue(res))
      .catch(err => setError(err))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  // Call execute if we want to fire the asyncFunction right away
  // Otherwise it can be called later, like from an onClick handler
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
};
