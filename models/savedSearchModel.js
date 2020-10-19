const mongoose = require('mongoose');

/**
 * Schema is used to save search term combinations. Also contains daily count of no. of jobs on reed
 */
const savedSearchSchema = new mongoose.Schema({
  searchTerms: { type: Array, required: true },
  dailySearchTermCount: { type: Array, required: false },
});

const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);

module.exports = { SavedSearch };
