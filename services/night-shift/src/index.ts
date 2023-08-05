// Require packages
import mongoose from 'mongoose';
import { Search } from './models/searchModel';
import { getCountAndSaveToRecord } from './utils';
import { TrackedSearchResult } from './types';

type Event = {
  runType: 'STANDARD' | 'DRY';
};

type Outcome = 'SUCCESS' | 'FAIL';

async function main(event: Event): Promise<Outcome> {
  console.info(`Starting main, event: ${JSON.stringify(event)}`);

  const { DB_PATH, REED_TOKEN } = process.env;

  // Check environment variables exist
  if (!DB_PATH) throw new Error('No DB_PATH found in environment variables');
  if (!REED_TOKEN) throw new Error('No REED_TOKEN found in environment variables');

  try {
    mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);

    return 'FAIL';
  }

  const searches: Array<TrackedSearchResult> = await Search.find();
  const timestamp = new Date();

  const results = await Promise.all(
    searches.map((search) => getCountAndSaveToRecord({ search, timestamp, isDryRun: event.runType === 'DRY' })),
  );

  const errorCount = results.filter(({ didError }) => didError).length;

  if (errorCount > 0) {
    console.info(`Standard run complete for ${searches.length} with ${errorCount} errors`);
    return 'SUCCESS';
  }

  console.info(`Standard run complete for ${searches.length} searches`);

  return 'SUCCESS';
}

exports.handler = main;
export {};
