# /Auth React

/auth is the easiest way to provide login and token gating to your web3 app! Get started in less than 5 minutes. Read more in [our docs](https://docs.slashauth.xyz). Or if you want to talk with real people join [our discord](https://discord.gg/9cuDEUcpRD).

## Features

- 🔥 Login and token gating out of the box
- 🔑 Security for your app and your clients
- 💨 Fast and lightweight
- ❤️ Helpful and friendly community

## Installation

Install slashauth react and peer dependencies using NPM:

`npm i --save @slashauth/slashauth-react wagmi ethers`

Or Yarn

`yarn add @slashauth/slashauth-react wagmi ethers`

## Getting started

If you prefer, you can follow along with the [quickstart guide](https://docs.slashauth.xyz/quick-start) or the corresponding [Github repo](https://github.com/slashauth/slashauth-react-quickstart-example).

### Create your /auth client

Visit the [/auth app](https://app.slashauth.xyz) and login with your wallet. Create a new app and take note of the Client ID as you'll need it in the next step. Also, ensure you add any authorized domains that you run your app at (for instance, `http://localhost:3000`).

![Creating an app](https://d1l2xccggl7xwv.cloudfront.net/slashauth/slashauth-client-id.png)

### Migrating a Wagmi project

If you currently use Wagmi in your project, all you have to do is replace your `WagmiConfig` component with the `SlashAuthProvider` component. You can even pass in your client if you want to the providers (this is optional).

```tsx
// file:index.tsx
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SlashAuthProvider } from '@slashauth/slashauth-react';
import { configureChains, createClient, chain } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const defaultChains = [mainnet, goerli]

const { chains, provider } = configureChains(
  defaultChains,
  [publicProvider()],
  { pollingInterval: 30_000 }
);
const wagmiClient = createClient({
  autoConnect: true,
  provider: provider,
}) as ReturnType<typeof createClient>;

root.render(
  <SlashAuthProvider clientID={{/* Your client id here */} providers={{
    wagmi: {
      wagmiClient,
    },
  }}>
    <App />
  </SlashAuthProvider>
);
```

### Connect the Provider

The /auth SDK uses [React Context](https://reactjs.org/docs/context.html) to manage state and expose it to your components. In order to integrate /auth into your app, you must provide the context at the root of your app:

```tsx
// file:index.tsx
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SlashAuthProvider } from '@slashauth/slashauth-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SlashAuthProvider clientID={/*_YOUR_CLIENT_ID _*/}>
    <App />
  </SlashAuthProvider>
);
```

The SlashAuthProvider only requires one property which is clientID. This must match an active app's clientID exactly.

Congratulations! Your app is now connected to /auth.

### Add login with wallet

The /auth SDK gives you tools to quickly implement authentication via Metamask wallet in your React application. The simplest implementation is to log the user in directly in their browser. We use the function openSignIn() from the useSlashAuth() hook to accomplish this.

```tsx
// file:LoginButton.tsx
import { useSlashAuth } from '@slashauth/slashauth-react';

export const LoginButton = () => {
  const { openSignIn } = useSlashAuth();

  return (
    <button className="login-button" onClick={() => openSignIn()}>
      Login With Wallet
    </button>
  );
};
```

You now have a button that when clicked should pop up Metamask and ask you to sign a transaction. You can verify that things are working properly by adding the LoginButton to your app and clicking it. After signing the message, verify a request is made and a 200 response code is received.

### Show authentication information

The /auth SDK exposes information about the current user and their logged in status via data returned by the useSlashAuth() hook. Because this data propagates via React Context, any time it changes your components will be notified and rerender. Let's create a status component

```tsx
// file:LoginStatus.tsx
import { useSlashAuth } from '@slashauth/slashauth-react';
import { useEffect, useState } from 'react';

export const LoginStatus = () => {
  const [accessToken, setAccessToken] = useState('');

  const {
    connectedWallet,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useSlashAuth();

  // A way to instantly detect when the access token changes so we
  // can store it in state to display to the screen.
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((at: string) => {
        setAccessToken(at);
      });
    } else {
      setAccessToken('');
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    return (
      <div>
        <span>'Loading...'</span>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'block' }}>
        <div>Is Wallet Connected? {connectedWallet ? 'Yes' : 'No'}</div>
        {connectedWallet && <div>Wallet address: {connectedWallet}</div>}
        <div>Is Logged In? {isAuthenticated ? 'Yes' : 'No'}</div>
        {isAuthenticated && (
          <div
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline',
            }}
            onClick={() => {
              navigator.clipboard.writeText(accessToken);
            }}
          >
            Click to copy access token
          </div>
        )}
      </div>
    </div>
  );
};
```

#### Using specific hooks

Aside from `useSlashAuth` hook, we also expose more specific hooks. This includes:

- `useHasRole`
- `useHasOrgRole`
- `useIsAuthenticated`

If you are missing a hook, please join our [Discord server](https://discord.gg/qGNqmKts).

### Logout Button

The /auth SDK exposes logout functionality that logs the user out both locally and invalidates their tokens remotely. Let's build a button to add this functionality.

```tsx
// file:LogoutButton.tsx
import { useSlashAuth } from "@slashauth/slashauth-react";

export const LogoutButton = () => {
  const { logout } = useSlashAuth();

  return <button onClick={() => logout()}>Logout</button>;
};
Tying it all together
A simple way to see this all work together is updating your app's entry point to display this information.
import { useSlashAuth } from '@slashauth/slashauth-react';
import { LoginStatus } from './LoginStatus';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';


function App() {
  const { isAuthenticated } = useSlashAuth();

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <LoginStatus />
    </div>
  );
}

export default App;
```

### Tying it all together

A simple way to see this all work together is updating your app's entry point to display this information.

```tsx
import { useSlashAuth } from '@slashauth/slashauth-react';
import { LoginStatus } from './LoginStatus';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

function App() {
  const { isAuthenticated } = useSlashAuth();

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <LoginStatus />
    </div>
  );
}

export default App;
```

Congratulations! You've successfully integrated with /auth.

You can find the full example of this code in our github repo.
