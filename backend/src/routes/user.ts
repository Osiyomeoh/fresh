import { Handler } from 'express';
import { controllers } from '../controllers';
import { isEmpty } from '../utils/strings';

export const getMe: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const { clientID, userID } = request.slashauth;

    if (
      typeof clientID === 'string' &&
      !isEmpty(clientID) &&
      typeof userID === 'string' &&
      !isEmpty(userID)
    ) {
      const user = await controllers.user.getMe(clientID, userID);

      return response.status(200).json(user);
    }

    return response.sendStatus(403);
  } catch (err) {
    return response.sendStatus(400);
  }
};

export const patchMe: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const { clientID, userID } = request.slashauth;

    const { nickname } = request.body;

    if (
      typeof clientID === 'string' &&
      !isEmpty(clientID) &&
      typeof userID === 'string' &&
      !isEmpty(userID) &&
      typeof nickname === 'string' &&
      !isEmpty(nickname)
    ) {
      const user = await controllers.user.patchMe(clientID, userID, nickname);
      return response.status(200).json(user);
    }

    return response.sendStatus(403);
  } catch (err) {
    return response.sendStatus(400);
  }
};

export const getUsers: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const clientID = request.slashauth.clientID;
    const cursor = request.query.cursor;

    if (typeof clientID === 'string' && !isEmpty(clientID)) {
      const users = await controllers.user.getUsers(clientID, cursor as string);

      return response.status(200).json(users);
    }
    return response.sendStatus(400);
  } catch (err) {
    if (err instanceof Error && err.message === 'unauthenticated') {
      return response.sendStatus(403);
    }
    return response.sendStatus(400);
  }
};
