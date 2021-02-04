import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
import 'jest-canvas-mock';

Enzyme.configure({ adapter: new Adapter() });

fetchMock.enableMocks();

jest.mock('chart.js', () => jest.fn().mockImplementation(() => null));

jest.mock('firebase/app', () => ({
  __esModule: true,
  default: {
    apps: [],
    initializeApp: () => {},
    auth: () => {},
    firestore: () => {
      return {
        collection: () => {
          return {
            get: () => {
              return [
                {
                  data: () => {
                    return { locations: ['Coventry', 'Essex', 'London'] };
                  },
                },
                {
                  data: () => {
                    return { skills: ['Node', 'JavaScript', 'Java'] };
                  },
                },
              ];
            },
          };
        },
      };
    },
  },
}));