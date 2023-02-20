import { init } from './init';
import express from 'express';
import rest from './servers/rest';

import './controllers/cache';

(async () => {
  await init();
  const app = express();

  rest(app);

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log('Listening on port', port);
  });
})();
