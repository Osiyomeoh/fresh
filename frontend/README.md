# Slashauth React Demo

## Getting started

Simply install the packages and start the app:

```
npm install
npm start
```

By default, the Slashauth app used is the `Demo Fallback App` with ID `Q8XH-kI6lvFBUutG`. You should override this to your own app ID. Simply copy `.env.example` to `.env` and enter your app ID for the `REACT_APP_APP_ID` field. This will run this app pointed to your Slashauth app.

### Updating the backend

By default, this app talks to the Slashauth demo backend API at https://api.demo.slashauth.xyz. If you prefer to run your own backend, we have a getting started repo [on github](https://www.github.com/slashauth/demo-backend). Clone that repo and run it, and point your local service to talk with it by running `npm run dev`.

You can deploy this service and simply update the config file with the location. Check `src/config.ts`.

## Overview

This project is a demo frontend for Slashauth. It contains the ability to spin up token gated content with data stored in your Slashauth app backend.

It contains two role levels:

- Demo_Admin
- Demo_Member

The following pages are gated by `Demo_Member`:

- pages/events
- pages/contact
- pages/data-room

The following pages are gated by `Demo_Admin`:

- pages/admin

In order to view the content in these pages, your Slashauth app must have your connected wallet assigned those roles.

## Assigning Roles

Roles can be assigned by either granting a role directly through your [Slashauth app dashboard](https://app.slashauth.xyz) or by holding a token defined by a token gate.

By default, the token gates refer to a Polygon ERC1155 contracts with address [0x3b7e292022c862dd39cc4f36e75c243bf44246d0](https://polygonscan.com/address/0x3b7e292022c862dd39cc4f36e75c243bf44246d0) for Demo_Admin and [0x757f46d81a8259281da43854f624a5923c03e000](https://polygonscan.com/address/0x757f46d81a8259281da43854f624a5923c03e000) for Demo_Member. The token ID associated is sha256(YOUR_CLIENT_APP_ID).

These contracts are maintained by the Slashauth demo oracle and cannot be minted by any other wallet. You can mint gas-free by going to your app's demo page (click the `View demo site` button from your [Slashauth app dashboard](https://app.slashauth.xyz)).

## Configuring this for yourself

You can easily modify the token gates associated with your app to grant yourself roles with NFT contracts you control. Simply go to the `Token Gating` section within your app dashboard.

## Minting tokens

While we have an Oracle deployed in the Slashauth demo app (for instance, check [our fallback demo app](https://q8xh-ki6lvfbuutg0236abcf.demo.slashauth.xyz/)) which allows for minting, these endpoints are not hooked up in the [demo backend](https://www.github.com/slashauth/demo-backend). Thus, hitting the mint buttons will result in 404 errors until they are hooked up when running `npm run dev`.
