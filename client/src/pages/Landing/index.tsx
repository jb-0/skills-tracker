import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import iphoneImg from '../../images/phone.png';
import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../../api';
import SearchCardResult from '../../components/SearchCardResult';

const Landing: React.FunctionComponent = () => {
  const imageDropShadow = 'drop-shadow(0 0 10px #212529)';
  const containerPadding = 4;
  const containerTopPadding = 6;

  const { data: trendingData = {} } = useQuery(getTrending.key, getTrending.fn);
  const showTrending = trendingData?.trendingSearches && trendingData?.trendingSearches?.length > 0;

  return (
    <>
      {/* First section */}
      <Box component="article" pt={containerTopPadding}>
        <Box maxWidth="md" mx="auto" display={{ sm: 'flex' }}>
          <Box width={{ sm: '50%' }} px={containerPadding} pb={containerPadding}>
            <Typography variant="h3">Track in demand skills in your area</Typography>
            <Typography>
              While there are plenty of great job sites out there it can be challenging to get a true gauge of how in
              demand a set of skills are, especially when you want to track this over time or observe historic trends.
              Skills Search provides an easy to use solution to this problem.
            </Typography>
          </Box>
          <Box width={{ sm: '50%' }} px={containerPadding} alignSelf="flex-end">
            <img
              alt="Man sitting in breakout area with laptop"
              src={iphoneImg}
              style={{
                WebkitFilter: imageDropShadow,
                filter: imageDropShadow,
                width: '250px',
                maxWidth: '100%',
                verticalAlign: 'bottom',
              }}
            />
          </Box>
        </Box>

        {/* Second section */}
        <Box bgcolor={blueGrey[800]}>
          <Box
            maxWidth="md"
            mx="auto"
            height="400px"
            maxHeight="100%"
            display="flex"
            flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
            flexDirection={{ xs: 'column-reverse', sm: 'row' }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={{ sm: '50%' }}
              height={{ sm: '100%' }}
              p={containerPadding}
            >
              <Box display="flex" flexDirection="column" width="fit-content">
                <Button variant="contained" size="large" href="/auth/facebook" sx={{ mb: 2 }}>
                  Sign up with Facebook
                </Button>
                <Button variant="contained" size="large" href="/auth/google">
                  Sign up with Google
                </Button>
              </Box>
            </Box>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignContent="center"
              height={{ sm: '100%' }}
              width={{ sm: '50%' }}
              p={containerPadding}
              pt={{ xs: containerTopPadding, sm: containerPadding }}
              color="primary.contrastText"
            >
              <Typography variant="h4">Sign up now</Typography>
              <Typography>
                Creating an account allows you to save searches as well as track new searches that are not currently in
                our database.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Third section */}
        {showTrending ? (
          <Box p={containerPadding} pt={containerTopPadding}>
            <Typography variant="h4" pb={2}>
              Trending skill searches
            </Typography>
            <Grid container spacing={2} width="100%" m="0">
              {trendingData?.trendingSearches?.map((searchResult, idx) => {
                return (
                  <Grid
                    item
                    key={`trending_search_item_${idx}`}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <SearchCardResult searchResult={searchResult} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Landing;
