const mongoose = require('mongoose');

/**
 * Schema is used to save search parameters. Also contains daily count of no. of jobs on reed
 */
const savedSearchSchema = new mongoose.Schema({
  searchTerms: { type: Object, required: true },
  dailySearchTermCount: { type: Array, required: false },
});

const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);

module.exports = { SavedSearch };
