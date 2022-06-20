import { Model } from 'mongoose';

interface shortUrlModel {
  full: string;
  short: string;
  clicks: number;
}

type shortenerRepoFunctions = Readonly<{
  addUrl: (full: string) => Promise<shortUrlModel>;
  findOne: (shortId: string) => Promise<shortUrlModel>;
  findAll: () => Promise<shortUrlModel[] | []>;
  patchUrl: (shortId: shortUrlModel) => Promise<shortUrlModel>;
  deleteUrl: (id: string) => Promise<shortUrlModel>;
}>;

type shortenerRepo = (shortUrlSchema: Model<shortUrlModel>) => shortenerRepoFunctions;

export type { shortUrlModel, shortenerRepo, shortenerRepoFunctions };
