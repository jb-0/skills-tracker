export interface TrendingSearchResult {
  dailySearchTermCount: [{ timestamp: string; count: string }];
  _id: string;
  searchTerms: {
    keywords: string;
    locationName: string;
    distanceFromLocation: number;
  };
  __v: number;
}

export interface TrendingResponse {
  msg?: string;
  trendingSearches?: TrendingSearchResult[];
}

export const getTrending = {
  key: ['trending'],
  fn: async (): Promise<TrendingResponse> => {
    const res = await fetch('/api/job/search/trending', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        frontend: 'react-frontend',
      },
    });

    return res.json();
  },
};

export interface SearchResponse {
  msg?: string;
  noOfResults?: string;
}

export const getSearch = {
  fn: async (searchTermString: string, location: string): Promise<SearchResponse> => {
    let apiQuery = `/api/job/search?keywords=${searchTermString}`;
    apiQuery += `&locationName=${location}`;
    apiQuery += `&distanceFromLocation=10`;

    const res = await fetch(apiQuery, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        frontend: 'react-frontend',
      },
    });

    return res.json();
  },
};
