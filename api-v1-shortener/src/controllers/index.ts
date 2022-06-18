import { shortenerRepo } from '../repository';
import makeShortenerController from './shortenerController';

const shortenerController = makeShortenerController({ shortenerRepo });

export { shortenerController };
