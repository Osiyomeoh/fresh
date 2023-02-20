import { useMemo } from 'react';
import { v4 } from 'uuid';

export const useUUID = () => {
  const id = useMemo(() => {
    return v4();
  }, []);

  return id;
};

export default useUUID;
