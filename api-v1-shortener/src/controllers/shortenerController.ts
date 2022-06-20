import { makeHttpResponse } from '../helpers/http-response';
import { handler, httpRequest } from '../models';
import { shortenerRepoFunctions } from '../models/shortener';

const makeShortenerController = (shortenerRepo: shortenerRepoFunctions) => {
  const handle: handler = async (httpRequest: httpRequest) => {
    switch (httpRequest.method) {
      case 'GET':
        return await getUrls(httpRequest);
      case 'POST':
        return await addUrl(httpRequest);
      case 'PATCH':
        return await patchUrl(httpRequest);
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
   * @description List Urls.
   * @param { httpRequest } httpRequest - Request Object
   * @returns Http Response - { success: true, items }
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
   * @description Post Url.
   * @param { httpRequest } httpRequest - Request Object
   * @returns Http Response - { success: true, item }
   */
  async function addUrl(httpRequest: httpRequest) {
    try {
      const { full } = httpRequest.body;
      if (!full) throw { error: 'please provide a valid url' };
      const item = await shortenerRepo.addUrl(full);
      return makeHttpResponse(200, { success: true, item });
    } catch (err: any) {
      return makeHttpResponse(400, { success: false, data: err });
    }
  }

  /**
   * @description Delete Url.
   * @param { httpRequest } httpRequest - Request Object
   * @returns Http Response - { success: true, item }
   */
  async function deleteUrl(httpRequest: httpRequest) {
    try {
      const { id } = httpRequest.queryParams;
      if (!id) throw { error: 'please provide a valid id' };
      const item = await shortenerRepo.deleteUrl(String(id));
      return makeHttpResponse(200, { success: true, item });
    } catch (err: any) {
      return makeHttpResponse(400, { success: false, data: err });
    }
  }

  /**
   * @description Patch Url.
   * @param { httpRequest } httpRequest - Request Object
   * @returns Http Response - { success: true, items }
   */
  async function patchUrl(httpRequest: httpRequest) {
    try {
      const { id } = httpRequest.body;
      if (!id) throw { error: 'please provide a valid id' };
      const item = await shortenerRepo.patchUrl(id);
      return makeHttpResponse(200, { success: true, item });
    } catch (err: any) {
      return makeHttpResponse(400, { success: false, data: err });
    }
  }
};

export default makeShortenerController;
