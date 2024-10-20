import { useCallback, useState } from 'react';

const useThrowError = () => {
  const [error, setError] = useState();
  return useCallback(
    (e: any) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};
