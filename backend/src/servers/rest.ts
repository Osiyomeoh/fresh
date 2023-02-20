import { SlashauthMiddlewareExpress } from '@slashauth/express';
import express from 'express';
import { getAppMetadata } from '../routes/app';
import { addEvent, getEvents } from '../routes/event';
import { healthCheck } from '../routes/health_check';
import { getMe, getUsers, patchMe } from '../routes/user';
import { slashauthClient } from '../third-party/slashauth_client';
import { CONSTANTS } from '../utils/constants';
import { wrapAsync } from '../utils/routes';
import multer from 'multer';
import {
  createFile,
  deleteFile,
  getPresignedURLForFile,
  listFiles,
  updateFile,
} from '../routes/file';

export default (app: express.Application) => {
  const cors = require('cors')({ origin: true });
  const middleware = new SlashauthMiddlewareExpress(slashauthClient);
  const file = multer();

  app.use(cors);
  app.use(express.json());

  // Middleware to parse the slashauth token
  app.use(middleware.parseAuthToken());

  app.get('/', wrapAsync(healthCheck));

  app.get('/metadata', wrapAsync(getAppMetadata));

  // Middleware to check roles
  app.get(
    '/events',
    middleware.hasRole(CONSTANTS.MEMBER_ROLE_LEVEL),
    wrapAsync(getEvents)
  );
  app.get(
    '/users',
    middleware.hasRole(CONSTANTS.ADMIN_ROLE_LEVEL),
    wrapAsync(getUsers)
  );

  app.get('/me', wrapAsync(getMe));

  app.patch('/me', wrapAsync(patchMe));

  app.post(
    '/events',
    middleware.hasRole(CONSTANTS.ADMIN_ROLE_LEVEL),
    wrapAsync(addEvent)
  );

  // FILES
  app.get(
    '/files',
    middleware.hasRole(CONSTANTS.MEMBER_ROLE_LEVEL),
    wrapAsync(listFiles)
  );

  app.get(
    '/files/:fileID/url',
    middleware.hasRole(CONSTANTS.MEMBER_ROLE_LEVEL),
    wrapAsync(getPresignedURLForFile)
  );

  // multer works as a middleware for multipart-uploads and appends it to the request (req.file)
  // file.single("file") says multer is expecting a single file with the key "file"
  app.post(
    '/files',
    [middleware.hasRole(CONSTANTS.ADMIN_ROLE_LEVEL), file.single('file')],
    wrapAsync(createFile)
  );
  app.patch(
    '/files/:fileID',
    middleware.hasRole(CONSTANTS.ADMIN_ROLE_LEVEL),
    wrapAsync(updateFile)
  );
  app.delete(
    '/files/:fileID',
    middleware.hasRole(CONSTANTS.ADMIN_ROLE_LEVEL),
    wrapAsync(deleteFile)
  );
};
