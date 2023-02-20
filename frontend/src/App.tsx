import { SlashAuthProvider } from '@slashauth/slashauth-react';
import { getConfig } from './config';
import { AppContents } from './AppContents';
import ConfigProvider from './providers/config-provider';
import ModalProvider from './providers/modal-provider';
import { classNames } from './util/classnames';
import AppProvider from './providers/app-provider';

const providerOptions = {
  walletconnect: {
    infuraId: '5f33013cac72474db85f8f603c842d92',
    bridge: 'https://bridge.walletconnect.org',
  },
  coinbasewallet: {
    appName: 'Slashauth',
    infuraId: '5f33013cac72474db85f8f603c842d92',
  },
};

function App() {
  const config = getConfig();

  return (
    <div
      className={classNames(
        'min-h-screen flex flex-col',
        'bg-white text-gray-800 dark:bg-pale-sky-900 dark:text-gray-300'
      )}
    >
      <ConfigProvider>
        <SlashAuthProvider
          clientID={config.appClientID}
          providers={providerOptions}
        >
          <AppProvider>
            <ModalProvider>
              <AppContents />
            </ModalProvider>
          </AppProvider>
        </SlashAuthProvider>
      </ConfigProvider>
      <div className="flex items-center justify-center my-8">
        Team Enovate
      </div>
    </div>
  );
}

export default App;
