import { Request, Response } from 'express';
import { httpRequest } from '../models';
import requestAdapter from './request-adapter';

const makeExpressCallback = (handler: any) => {
  return async (req: Request, res: Response) => {
    try {
      const httpRequest = requestAdapter(req);
      const httpResponse = await handler(httpRequest as httpRequest);
      if (httpResponse.headers) res.set(httpResponse.headers);
      res.type('json');
      res.status(httpResponse.statusCode).send(httpResponse.data);
    } catch (err: any) {
      console.log(err.message);
      res.status(500).send({ error: 'An unkown error occurred.' });
    }
  };
};

export default makeExpressCallback;
