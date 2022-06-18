import { Request } from 'express';

const requestAdapter = (req: Request) => {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent'),
      Authorization: req.get('Authorization')
    }
  });
};

export default requestAdapter;
