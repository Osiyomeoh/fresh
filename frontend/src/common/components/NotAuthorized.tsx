import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../../api';
import { AppContext, ConfigContext } from '../../context';
import { PrimaryButton } from './Buttons';
import { BeatLoader } from './spinners/beat-loader';

type Props = {
  roleNameRequired: string;
};

export const NotAuthorized = ({ roleNameRequired }: Props) => {
  const { roles } = useContext(AppContext);
  const { getTokens, account } = useSlashAuth();
  const config = useContext(ConfigContext);

  const [minting, setMinting] = useState(false);
  const [txResponse, setTxResponse] = useState<string>(null);

  const handleMintClick = useCallback(async () => {
    if (!account?.wallet?.default || minting) {
      return;
    }
    setMinting(true);
    try {
      const token = await getTokens();
      if (token) {
        const resp = await new API(config, token).mintToken(roleNameRequired);
        if (resp.success) {
          toast.success(
            <span>
              Success! Check your transaction{' '}
              <a href={resp.scanUrl} target="_blank" rel="noreferrer">
                here
              </a>
            </span>,
            {
              duration: 5000,
            }
          );
          setTxResponse(resp.txHash);
          setTimeout(async () => {
            roles.fetch(roleNameRequired);
          }, 5000);
        }
      }
    } catch (err) {
      console.error('Error minting NFT: ', err);
      toast.error('Failed to mint NFT. Please check console for more info.');
    } finally {
      setMinting(false);
    }
  }, [
    account?.wallet?.default,
    config,
    getTokens,
    minting,
    roleNameRequired,
    roles,
  ]);

  if (minting) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
        <div className="text-center">
          <h2 className="text-[24px] font-semibold text-center text-primary mb-1">
            Minting NFT...
          </h2>
          <p className="text-[16px] text-center text-secondary mb-6">
            Please wait...
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <BeatLoader />
        </div>
      </div>
    );
  }
  if (txResponse) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
        <div className="text-center">
          <h2 className="text-[24px] font-semibold text-center text-primary mb-1">
            Successfully Minted!
          </h2>
          <p className="text-[16px] text-center text-secondary mb-2">
            Refreshing your roles...
          </p>
          <p className="text-[12px] text-center text-secondary mb-6">
            (You may have to refresh the page if this doesn't update...)
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <BeatLoader />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      <h2 className="text-[24px] font-semibold text-center text-primary mb-1">
        This page is only viewable to those with {roleNameRequired} privileges.
      </h2>
      <p className="text-[16px] text-center text-secondary mb-6">
        Mint a free NFT to get the {roleNameRequired} role.
      </p>
      <PrimaryButton onClick={handleMintClick}>
        Mint {roleNameRequired} NFT
      </PrimaryButton>
    </div>
  );
};
