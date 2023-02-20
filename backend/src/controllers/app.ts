import { slashauthClient } from '../third-party/slashauth_client';

type AppRecord = {
  clientID: string;
  name: string;
  description?: string;
};

export class AppController {
  /**
   * getAppMetadataController returns the appMetadata to render the home page
   * @param clientID
   * @returns
   */
  getAppMetadataController = async (clientID: string): Promise<AppRecord> => {
    const { data, error: getDataErr } = await slashauthClient.app.getInfo();

    if (getDataErr) {
      console.error(getDataErr);
      throw getDataErr;
    }

    if (!data) {
      throw new Error(
        `getApp did not return a result for clientID ${clientID}`
      );
    }

    return {
      clientID: data.clientID,
      name: data.name,
      description: data.description,
    };
  };
}
