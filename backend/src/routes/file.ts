import { Handler } from 'express';
import { controllers } from '../controllers';
import { isEmpty } from '../utils/strings';

export const getPresignedURLForFile: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const clientID = request.slashauth.clientID;
    const fileID = request.params.fileID;

    if (clientID && !isEmpty(clientID) && !isEmpty(fileID)) {
      const fileURL = await controllers.file.getPresignedURLForFile(
        clientID,
        fileID
      );

      return response.status(200).json({ data: { url: fileURL }});
    }
    return response.sendStatus(403);
  } catch (err) {
    return response.sendStatus(400);
  }
};

export const listFiles: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const clientID = request.slashauth.clientID;
    const cursor = request.query.cursor;

    if (clientID && !isEmpty(clientID)) {
      const files = await controllers.file.listFiles(clientID, cursor as string);

      return response.status(200).json({ data: files });
    }

    return response.sendStatus(403);
  } catch (err) {
    console.error('err: ', err);
    return response.sendStatus(400);
  }
};

export const createFile: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const { clientID, userID } = request.slashauth;
    const file = request.file;

    const { name, roles_required, description } = request.body;

    const rolesRequired = JSON.parse(roles_required);
    if (
      clientID &&
      !isEmpty(clientID) &&
      userID &&
      !isEmpty(userID) &&
      !isEmpty(name) &&
      rolesRequired &&
      file
    ) {
      const fileRecord = await controllers.file.createFile(clientID, userID, {
        name,
        rolesRequired,
        description,
        file,
      });

      return response.status(200).json({ data: fileRecord });
    }

    return response.sendStatus(403);
  } catch (err) {
    console.error('err: ', err);
    return response.sendStatus(400);
  }
};

export const updateFile: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const clientID = request.slashauth.clientID;
    const fileID = request.params.fileID;

    const { name, roles_required, description } = request.body;

    if (clientID && !isEmpty(clientID) && !isEmpty(fileID)) {
      const file = await controllers.file.updateFile(clientID, fileID, {
        name,
        rolesRequired: roles_required,
        description,
      });

      return response.status(200).json({ data: file });
    }

    return response.sendStatus(403);
  } catch (err) {
    console.error('err: ', err);
    return response.sendStatus(400);
  }
};

export const deleteFile: Handler = async (request, response) => {
  try {
    // Make sure the user is authed
    if (!request.slashauth.isAuthed) {
      return response.sendStatus(401);
    }

    const clientID = request.slashauth.clientID;

    const fileID = request.params.fileID;

    if (clientID && !isEmpty(clientID) && !isEmpty(fileID)) {
      const file = await controllers.file.deleteFile(clientID, fileID);

      return response.status(200).json({ data: file });
    }

    return response.sendStatus(403);
  } catch (err) {
    console.error('err: ', err);
    return response.sendStatus(400);
  }
};
