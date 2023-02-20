import { PresignedURLForFile, FileRecord } from '@slashauth/types';
import { slashauthClient } from '../third-party/slashauth_client';

type CreateFileInput = {
  name: string;
  rolesRequired: string[];
  description?: string;
  file: Express.Multer.File;
};

type UpdateFileInput = {
  name?: string;
  rolesRequired?: string[];
  description?: string;
};

export class FileController {
  getPresignedURLForFile = async (
    clientID: string,
    fileID: string
  ): Promise<PresignedURLForFile> => {
    const { data: fileURL, error: getUrlErr } =
      await slashauthClient.file.getPresignedURL({
        id: fileID,
      });

    if (getUrlErr) {
      console.error(getUrlErr);
      throw getUrlErr;
    }

    if (!fileURL) {
      throw new Error(
        `getPresignedURL did not return a result for clientID ${clientID} and fileID ${fileID}`
      );
    }

    return fileURL;
  };

  listFiles = async (
    clientID: string,
    cursor?: string
  ): Promise<FileRecord[]> => {
    const { paginatedResponse: files, error: listFilesErr } =
      await slashauthClient.file.listFiles({
        cursor,
      });

    if (listFilesErr) {
      console.error(listFilesErr);
      throw listFilesErr;
    }

    if (!files?.data) {
      throw new Error(
        `listFiles did not return a result for clientID ${clientID}`
      );
    }

    return files.data;
  };

  // admin-gated
  createFile = async (
    clientID: string,
    userID: string,
    input: CreateFileInput
  ): Promise<FileRecord> => {
    const { data: file, error: addFileErr } =
      await slashauthClient.file.addFile({
        file: input.file.buffer,
        mimeType: input.file.mimetype,
        userID,
        name: input.name,
        rolesRequired: input.rolesRequired,
        description: input.description,
      });

    if (addFileErr) {
      console.error(addFileErr);
      throw addFileErr;
    }

    if (!file) {
      throw new Error(
        `createFile did not return a result for clientID ${clientID} and userID ${userID}`
      );
    }

    return file;
  };

  updateFile = async (
    clientID: string,
    fileID: string,
    input: UpdateFileInput
  ): Promise<FileRecord> => {
    const { data: file, error: updateFileErr } =
      await slashauthClient.file.updateFile({
        id: fileID,
        name: input.name,
        description: input.description,
        rolesRequired: input.rolesRequired,
      });

    if (updateFileErr) {
      console.error(updateFileErr);
      throw updateFileErr;
    }

    if (!file) {
      throw new Error(
        `updateFile did not return a result for clientID ${clientID}`
      );
    }

    return file;
  };

  deleteFile = async (
    clientID: string,
    fileID: string
  ): Promise<FileRecord> => {
    const { data: file, error: deleteFileErr } =
      await slashauthClient.file.deleteFile({
        id: fileID,
      });

    if (deleteFileErr) {
      console.error(deleteFileErr);
      throw deleteFileErr;
    }

    if (!file) {
      throw new Error(
        `deleteFile did not return a result for clientID ${clientID}`
      );
    }

    return file;
  };
}
