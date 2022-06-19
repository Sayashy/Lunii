import database from './db';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import makeCallback from './helpers/express-callback';
import handleOptionRequest from './helpers/handle-option-request';
import { shortenerController } from './controllers';

dotenv.config();
const port = process.env.PORT || 20000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

database.connect();

app.use('/*', handleOptionRequest);

app.get('/:id', makeCallback(shortenerController));
app.all('/*', makeCallback(shortenerController));

app.listen(port, () => {
  console.log(`api-v1-shortener is listening on port ${port}`);
});
