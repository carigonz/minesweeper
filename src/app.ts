import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import apiRoutes from './api';

const app: Application = express();

const port: number = 3001;

app.use(cors({ origin: (_, next) => next(null, true) }));
app.use(
  // REQ.BODY PARSER
  bodyParser.json({ limit: '10mb' }),
);
app.use('/', express.static(`${__dirname}/public`));
app.use(apiRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
