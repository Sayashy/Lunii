import { Model } from 'mongoose';
import { isURL } from '../helpers/shortenerHelpers';
import { shortUrlModel, shortenerRepo } from '../models/shortener';

const makerShortenerRepo: shortenerRepo = (shortUrlSchema: Model<shortUrlModel>) => {
  return Object.freeze({
    addUrl,
    findOne,
    findAll,
    patchUrl,
    deleteUrl
  });

  /**
   * @description Get one url
   * @returns { shortUrlModel } { full, short, clicks }
   * @see /db/shortUrlSchema.ts
   */
  async function findOne(shortId: string) {
    try {
      const item = (await shortUrlSchema.findOne({ short: shortId })) as shortUrlModel | null | undefined;
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
      return (await shortUrlSchema.find()) as Array<shortUrlModel> | [];
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
      return (await shortUrlSchema.create({ full })) as shortUrlModel;
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
      const item = (await shortUrlSchema.findByIdAndDelete({ _id: id })) as shortUrlModel;
      if (!item) throw { error: 'Not Found' };
      return item;
    } catch (err: unknown) {
      throw err;
    }
  }

  /**
   * @description Patch URL if exists
   * @param shortId URL shortId
   * @returns Patch Object { full, short, clicks }
   * @see /db/shortUrlSchema.ts
   */
  async function patchUrl(shortId: shortUrlModel) {
    try {
      const doc = await shortUrlSchema.findOneAndUpdate({ short: shortId }, { $inc: { clicks: 1 } }, { upsert: false });
      if (!doc) throw { error: 'Not Found' };
      return doc as shortUrlModel;
    } catch (err: unknown) {
      throw err;
    }
  }
};

export default makerShortenerRepo;
