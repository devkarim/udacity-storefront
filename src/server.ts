import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from './config';
import { ADDRESS } from './config/constants';

const app: express.Application = express();

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(config.PORT, function () {
  console.log(`Listening on: ${ADDRESS}`);
});
