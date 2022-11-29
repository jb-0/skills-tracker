import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import iphoneImg from "../../images/AppOnPhone.png";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../../api";
import SearchCardResult from "../../components/SearchCardResult";
import {
  BookmarksOutlined,
  SearchOutlined,
  TimelineOutlined,
} from "@mui/icons-material";
import FeatureChip from "../../components/FeatureChip";

const Landing: React.FunctionComponent = () => {
  const containerPadding = 4;
  const containerTopPadding = 6;

  const { data: trendingData = {} } = useQuery(getTrending.key, getTrending.fn);
  const showTrending =
    trendingData?.trendingSearches &&
    trendingData?.trendingSearches?.length > 0;

  return (
    <>
      {/* First section */}
      <Box component="article" pt={containerTopPadding}>
        <Box maxWidth="md" mx="auto" display={{ sm: "flex" }}>
          <Box
            width={{ sm: "50%" }}
            px={containerPadding}
            pb={containerPadding}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Typography variant="h3" fontWeight="700" mb={2}>
              Track in demand skills in your area
            </Typography>
            <Typography>
              While there are plenty of great job sites out there it can be
              challenging to get a true gauge of how in demand a set of skills
              are, especially when you want to track this over time or observe
              historic trends. Skills Search provides an easy to use solution to
              this problem.
            </Typography>
          </Box>
          <Box width={{ sm: "50%" }} px={containerPadding} alignSelf="flex-end">
            <img
              alt="Mobile phone with skills tracker web app open in a browser"
              src={iphoneImg}
              style={{
                width: "250px",
                maxWidth: "100%",
                verticalAlign: "bottom",
              }}
            />
          </Box>
        </Box>

        {/* Features */}
        <Box
          display="flex"
          justifyContent="space-between"
          maxWidth="md"
          mx="auto"
          p={containerPadding}
        >
          <FeatureChip
            text="Search by location and skill"
            icon={<SearchOutlined color="primary" />}
          />

          <FeatureChip
            text="Save your searches"
            icon={<BookmarksOutlined color="primary" />}
          />

          <FeatureChip
            text="Visualise searches"
            icon={<TimelineOutlined color="primary" />}
          />
        </Box>

        <Typography>
          Creating an account allows you to save searches as well as track new
          searches that are not currently in our database.
        </Typography>
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
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
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
