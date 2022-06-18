import { Model } from 'mongoose';
import { isURL } from '../helpers/shortenerHelpers';
import { shortUrlModel } from '../models/shortener';

const makerShortenerRepo = (shortUrlSchema: Model<shortUrlModel>) => {
  return Object.freeze({
    addUrl,
    findOne,
    findAll,
    deleteUrl
  });

  /**
   * @description Get all urls
   * @returns Array -> [..., { full, short, clicks }]
   * @see /db/shortUrlSchema.ts
   */
  async function findOne(shortId: string) {
    try {
      const item = await shortUrlSchema.findOne({ short: shortId });
      if (!item) throw { error: 'Not Found' };
      return item;
    } catch (err: any) {
      throw err;
    }
  }

  /**
   * @description Get all urls
   * @returns Array -> [..., { full, short, clicks }]
   * @see /db/shortUrlSchema.ts
   */
  async function findAll() {
    try {
      return await shortUrlSchema.find();
    } catch (err: any) {
      throw err;
    }
  }

  /**
   * @description Create a short version of the full Url provided
   * @param full A valid Url link
   * @returns Shortned Object { full, short, clicks }
   * @see /db/shortUrlSchema.ts
   */
  async function addUrl(full: string) {
    try {
      if (!isURL(full)) throw { error: 'invalid url' };
      return await shortUrlSchema.create({ full });
    } catch (err: unknown) {
      throw err;
    }
  }

  /**
   * @description Delete URL if exists
   * @param id URL Id
   * @returns Deleted Object { full, short, clicks }
   * @see /db/shortUrlSchema.ts
   */
  async function deleteUrl(id: string) {
    try {
      return await shortUrlSchema.deleteOne({ _id: id });
    } catch (err: unknown) {
      throw err;
    }
  }
};

export default makerShortenerRepo;
