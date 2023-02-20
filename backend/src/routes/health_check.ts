import { Handler } from 'express';

export const healthCheck: Handler = async (_, response) => {
  return response.status(200).json({ success: true });
};
