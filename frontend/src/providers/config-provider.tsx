import { useMemo } from 'react';
import { getConfig } from '../config';
import { ConfigContext } from '../context';

type Props = {
  children: React.ReactNode;
};

const ConfigProvider = ({ children }: Props) => {
  const conf = useMemo(() => {
    return getConfig();
  }, []);

  return (
    <ConfigContext.Provider value={conf}>{children}</ConfigContext.Provider>
  );
};

export default ConfigProvider;
