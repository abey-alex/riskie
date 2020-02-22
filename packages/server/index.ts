// Load dotenv configurations
const result = require('dotenv').config();
const debug = require('debug')('app:server');

if (result.error) {
    debug(`Error in dotenv. Throwing error`);
    throw result.error;
}

import express from 'express';
import helmet from 'helmet';

const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;
const app = express();

app.disable('x-powered-by');
app.use(helmet());



app.use((err: string, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isProduction) {
    return res.status(500).send(err);
  }

  return res.sendStatus(500);
});

app.listen(port, () => {
  console.info(`✅ Server is up at http://${host}:${port}`);
});
