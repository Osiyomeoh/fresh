import { Handler } from 'express';
import { controllers } from '../controllers';
import { CONSTANTS } from '../utils/constants';
import { isEmpty } from '../utils/strings';

export const getAppMetadata: Handler = async (request, response) => {
  try {
    const clientID = request.headers[CONSTANTS.CLIENT_ID_HEADER];

    if (typeof clientID === 'string' && !isEmpty(clientID)) {
      // const appMetadata = await getAppMetadataController(clientID);
      const appMetadata = await controllers.app.getAppMetadataController(
        clientID
      );

      return response.status(200).json(appMetadata);
    }
    return response.sendStatus(400);
  } catch (err) {
    return response.sendStatus(400);
  }
};
