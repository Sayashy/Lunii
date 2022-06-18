interface httpResponse {
  headers: { [key: string]: string };
  statusCode: number;
  data: string;
}

type queryParams = { [key: string]: undefined | string | string[] | queryParams | queryParams[] };

interface requestParams {
  path: string;
  method: string;
  pathParams: { [key: string]: string };
  queryParams: queryParams;
  body: any;
  headers: { [key: string]: string };
}

type httpRequest = Readonly<requestParams>;

type handler = (httpRequest: httpRequest) => httpResponse | Promise<httpResponse>;

type httpResponseMaker = (statusCode: number, data: { [key: string]: unknown }) => httpResponse;

export type { httpResponse, httpRequest, handler, httpResponseMaker };
