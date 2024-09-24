import { useEffect } from 'react';

export const useResetOnSubmit = <T extends (...args: any[]) => void>(
  condition: boolean,
  resetFunction: T,
  dependencies: any[] = []
) => {
  useEffect(() => {
    if (condition) {
      resetFunction();
    }
  }, [condition, resetFunction, ...dependencies]);
};
