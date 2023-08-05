// Require packages
require('dotenv').config();
import mongoose from 'mongoose';
import { Search } from './models/searchModel';
import { searchReed } from './services/jobServices';

async function main(event: any) {
  console.log(`Event ${JSON.stringify(event)}`);
  /* ***************************************
  DB CONNECTION
  *************************************** */
  const DB_PATH = process.env.PROD ? process.env.PROD_DB_PATH : process.env.DEV_DB_PATH;

  try {
    if (!DB_PATH) throw new Error('No DB_PATH found in .env file');
    mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
  }

  /* ***************************************
  MAIN JOB
  *************************************** */
  const searches = await Search.find();
  const timestamp = new Date();
  let errCount = 0;

  async function getCountAndSaveToRecord(search: any) {
    const apiResponse = await searchReed(search.searchTerms);

    try {
      await Search.findByIdAndUpdate(search._id, {
        $push: { dailySearchTermCount: { timestamp, count: apiResponse.totalResults } },
      }).exec();
      console.log(`Count for Search ID:${search._id} added`);
    } catch (err: any) {
      console.log(`Search ID:${search._id} failed with Error: ${err.message}`);
      errCount++;
    }
  }

  async function runForAllRecords() {
    return Promise.all(searches.map(getCountAndSaveToRecord));
  }

  if (event.runType === 'standard') {
    await runForAllRecords();

    if (errCount > 0) {
      const msg = `Standard run complete for ${searches.length} searches with ${errCount} errors`;
      console.log(msg);
      return msg;
    }
    const msg = `Standard run complete for ${searches.length} searches`;
    console.log(msg);
    return msg;
  }
}

exports.handler = main;
export {};
