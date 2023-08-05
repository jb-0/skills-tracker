import { model, Schema } from 'mongoose';

/**
 * Schema is used to save search parameters. Also contains daily count of no. of jobs on reed
 */
const searchSchema = new Schema({
  searchTerms: { type: Object, required: true },
  dailySearchTermCount: { type: Array, required: false },
});

export const Search = model('Search', searchSchema);
