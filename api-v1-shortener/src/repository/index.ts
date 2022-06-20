import shortUrlSchema from '../db/shortUrlSchema';
import makerShortenerRepo from './shortenerRepo';

const shortenerRepo = makerShortenerRepo(shortUrlSchema);

export { shortenerRepo };
