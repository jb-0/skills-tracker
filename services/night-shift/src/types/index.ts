export interface TrackedSearchResult {
  dailySearchTermCount: [{ timestamp: string; count: string }];
  _id: string;
  searchTerms: {
    keywords: string;
    locationName: string;
    distanceFromLocation: number;
  };
  __v: number;
}
