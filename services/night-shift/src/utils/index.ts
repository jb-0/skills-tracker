import { Search } from '../models/searchModel';
import { searchReed } from '../services/jobServices';
import { TrackedSearchResult } from '../types';

export const getCountAndSaveToRecord = async ({
  search,
  timestamp,
  isDryRun,
}: {
  search: TrackedSearchResult;
  timestamp: Date;
  isDryRun?: boolean;
}): Promise<{ didError: boolean }> => {
  const apiResponse = await searchReed(search.searchTerms);

  try {
    if (isDryRun) {
      const record = await Search.findById(search._id).exec();
      console.log(`Dry run for Search ID: ${record._id} returned ${apiResponse.totalResults}`);
    } else {
      await Search.findByIdAndUpdate(search._id, {
        $push: { dailySearchTermCount: { timestamp, count: apiResponse.totalResults } },
      }).exec();
      console.info(`Count for Search ID: ${search._id} added`);
    }

    return { didError: false };
  } catch (err: any) {
    console.info(`Search ID: ${search._id} failed with Error: ${err.message}`);
  }

  return { didError: true };
};
