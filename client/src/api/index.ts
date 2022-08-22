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

export interface TrendingResponse {
  msg?: string;
  trendingSearches?: TrackedSearchResult[];
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

export interface SavedResponse {
  msg?: string;
  savedSearches?: TrackedSearchResult[];
}

export const getSaved = {
  key: ['saved'],
  fn: async (): Promise<SavedResponse> => {
    const res = await fetch('/api/job/search/saved', {
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

export const deleteSaved = {
  fn: async (id: string): Promise<unknown> => {
    const res = await fetch(`/api/job/search/delete/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        frontend: 'react-frontend',
      },
    });

    return res.json();
  },
};
