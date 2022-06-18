import { makeHttpResponse } from '../helpers/http-response';
import { handler, httpRequest } from '../models';

const makeShortenerController = ({ shortenerRepo }: { shortenerRepo: any }) => {
  const handle: handler = async (httpRequest: httpRequest) => {
    switch (httpRequest.method) {
      case 'GET':
        return await getUrls(httpRequest);
      case 'POST':
        return await addUrl(httpRequest);
      case 'DELETE':
        return await deleteUrl(httpRequest);
      default:
        return makeHttpResponse(405, {
          success: false,
          error: `${httpRequest.method} method not allowed`
        });
    }
  };
  return handle;

  /**
   * List Urls.
   * @param {Object} httpRequest - Request Object
   */
  async function getUrls(httpRequest: httpRequest) {
    try {
      const { id } = httpRequest.pathParams;
      const items = id ? await shortenerRepo.findOne(id) : await shortenerRepo.findAll();
      return makeHttpResponse(200, { success: true, items });
    } catch (err: any) {
      return makeHttpResponse(400, { success: false, data: err });
    }
  }

  /**
   * Post Url.
   * @param {Object} httpRequest - Request Object
   */
  async function addUrl(httpRequest: httpRequest) {
    try {
      const { full } = httpRequest.body;
      const item = await shortenerRepo.addUrl(full);
      return makeHttpResponse(200, { success: true, item });
    } catch (err: any) {
      return makeHttpResponse(400, { success: false, data: err });
    }
  }

  /**
   * Post Url.
   * @param {Object} httpRequest - Request Object
   */
  async function deleteUrl(httpRequest: httpRequest) {
    try {
      const { id } = httpRequest.queryParams;
      const item = await shortenerRepo.deleteUrl(id);
      return makeHttpResponse(200, { success: true, item });
    } catch (err: any) {
      return makeHttpResponse(400, { success: false, data: err });
    }
  }
};

export default makeShortenerController;
