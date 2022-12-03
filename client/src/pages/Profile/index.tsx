import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import SavedSearches from '../../components/SavedSearches';
import SearchForm from '../../components/SearchForm';

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

const Profile: React.FunctionComponent = () => {
  const [tab, setTab] = useState(0);
  const containerPadding = 4;

  return (
    <Box p={containerPadding} maxWidth="lg" mx="auto">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 'fit-content' }}>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} aria-label="Dashboard tabs">
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Saved searches" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {tab === 0 ? <SearchForm showSaveButton={true} /> : null}
      {tab === 1 ? <SavedSearches /> : null}
    </Box>
  );
};

export default Profile;
