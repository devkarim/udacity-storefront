import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import { ADDRESS } from './config/constants';
import productRoutes from './handlers/productRoutes';
import orderRoutes from './handlers/orderRoutes';
import userRoutes from './handlers/userRoutes';
import dashboardRoutes from './handlers/dashboardRoutes';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(config.PORT, () => {
  console.log(`Listening on: ${ADDRESS}`);
});

export default app;
