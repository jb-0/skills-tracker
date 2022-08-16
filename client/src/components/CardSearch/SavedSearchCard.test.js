// import '@testing-library/jest-dom/extend-expect';
// import React from 'react';
// import renderer from 'react-test-renderer';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';

// import SavedSearchCard from '../zsearchCard/SavedSearchCard';
// import { unmountComponentAtNode } from 'react-dom';

// describe('Saved Search Card component', () => {
//   let container = null;
//   const sampleSearch = {
//     _id: 1,
//     searchTerms: {
//       keywords: 'Node',
//       locationName: 'coventry',
//       distanceFromLocation: 10,
//     },
//     dailySearchTermCount: [
//       { timestamp: '2020-11-13T08:36:05.986+00:00', count: '252' },
//     ],
//   };

//   beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement('div');
//     document.body.appendChild(container);
//   });

//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//   });

//   it('card renders with props passed in and locations are capitalised', () => {
//     act(() => {
//       render(
//         <SavedSearchCard
//           search={sampleSearch}
//           removeSavedSearch={jest.fn()}
//           source="profile"
//         />,
//         container
//       );
//     });

//     expect(screen.queryAllByText(/Coventry/)).toHaveLength(1);
//   });

//   it('delete button shows when saved search is rendered from a user profile', () => {
//     act(() => {
//       render(
//         <SavedSearchCard
//           search={sampleSearch}
//           removeSavedSearch={jest.fn()}
//           source="profile"
//         />,
//         container
//       );
//     });

//     expect(screen.queryAllByTestId('delete')).toHaveLength(1);
//   });

//   it('delete button does not show when saved search is rendered from trending', () => {
//     act(() => {
//       render(
//         <SavedSearchCard
//           search={sampleSearch}
//           removeSavedSearch={jest.fn()}
//         />,
//         container
//       );
//     });

//     expect(screen.queryAllByTestId('delete')).toHaveLength(0);
//   });

//   it('the delete api route is called when the delete button is pressed', async () => {
//     const promise = Promise.resolve();

//     // Mock a positive response (200)
//     fetch.mockResponseOnce(JSON.stringify({ msg: 'positive response' }), {
//       status: 200,
//     });

//     act(() => {
//       render(
//         <SavedSearchCard
//           search={sampleSearch}
//           removeSavedSearch={jest.fn()}
//           source="profile"
//         />,
//         container
//       );
//     });

//     // Click the delete icon
//     userEvent.click(screen.getByTestId('delete'))

//     // Wait for changes to occur
//     await act(() => promise);

//     // The mocked fetch should be called once
//     expect(fetch).toHaveBeenCalledTimes(1);

//     // We do not expect to see the failure text in the above scenario
//     expect(screen.queryAllByText(/Unable to delete saved search at this time/)).toHaveLength(0);
//   });

//   it('when deletion fails an alert is displayed', async () => {
//     const promise = Promise.resolve();

//     // Mock a non 200 response
//     fetch.mockResponseOnce(JSON.stringify({ msg: 'positive response' }), {
//       status: 500,
//     });

//     act(() => {
//       render(
//         <SavedSearchCard
//           search={sampleSearch}
//           removeSavedSearch={jest.fn()}
//           source="profile"
//         />,
//         container
//       );
//     });

//     // Click the delete icon
//     userEvent.click(screen.getByTestId('delete'))

//     // Wait for changes to occur
//     await act(() => promise);

//     // Given the mocked response was 500, expect an error to displayed
//     expect(screen.queryAllByText(/Unable to delete saved search at this time/)).toHaveLength(1);
//   })
// });
