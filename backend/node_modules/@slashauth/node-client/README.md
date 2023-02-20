# /Auth Node Client

/auth is the easiest way to provide login and token gating to your web3 enabled app!

This package provides a client to Slashauth to use from your node backend. Authorize any wallet within your app with a single API call.

[Learn how to use SlashAuth in your project by reading the docs](https://docs.slashauth.com/)

## Features

- 🔥 Login and token gating out of the box
- 🔑 Security for your app and your clients
- 💨 Fast and lightweight
- ❤️ Helpful and friendly community

## Installation

Install slashauth node client using NPM:

`npm i --save @slashauth/node-client`

Or Yarn

`yarn add @slashauth/node-client`

## Initial steps

In order to use Slashauth you must first create a Slashauth app. Create one [here](https://app.slashauth.com). Take note of your client ID and client secret because you'll need these in the next step.

## Usage

Instantiate the Slashauth Client in your app using your client ID and client secret above:

```ts
const slashauthClient = new SlashauthClient(<your client id>, <your client secret>);
```

Use the client to authorize whether a wallet has a specified role:

```ts
const [hasRole, , err] = await slashauthClient.hasRole({
  address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  role: 'admin',
});

if (err) {
  console.log(err);
}

console.log('has role? ', hasRole);
```

Use the client to validate a user's token. This endpoint will return a 403 for invalid tokens:

```ts
slashauthClient
  .validateToken({
    token: 'eyJhbGciOiJSUzI1NiI...R814nN5izqQ-y1OzgNUXSDfF3d1rWjloZ3sw',
  })
  .then((response) => {
    console.log({
      clientID: r.clientID,
      address: r.address,
      expiresAt: r.expiresAt,
    });
  })
  .catch((e) => console.error(e));
```
