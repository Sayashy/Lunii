import { httpResponseMaker } from '../models';

const makeHttpResponse: httpResponseMaker = (statusCode: number, data: { [key: string]: unknown }) => ({
  headers: { 'Content-Type': 'application/json' },
  statusCode,
  data: JSON.stringify(data)
});

export { makeHttpResponse };
