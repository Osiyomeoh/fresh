import { useMemo } from 'react';
import { useSlashAuth } from '@slashauth/slashauth-react';

type Props = {
  children: React.ReactNode;
};

export const SlashAuthLoadedWrapper = ({ children }: Props) => {
  const { error, initialized } = useSlashAuth();

  const contents = useMemo(() => {
    if (error) {
      return null;
    } else if (initialized) {
      // NOTE: Leave this here. We may want to use it in the future for better error handling.
      // return (
      //   <div className="z-20 w-full py-4 font-bold text-center text-white text-gray-300 bg-red-400 dark:bg-coral-red-400 dark:text-pale-sky-900">
      //     Please connect metamask to Eth mainnet or navigate to{' '}
      //     <a
      //       className="text-gray-900"
      //       href={`${config.appEndpoint}`}
      //     >{`${config.appEndpoint}`}</a>{' '}
      //     to work with mainnet.
      //   </div>
      // );
    }
  }, [error, initialized]);

  return (
    <div className="flex flex-col flex-grow w-full">
      {contents}
      {children}
    </div>
  );
};
