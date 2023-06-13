import {
  Box, Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createWatchGroup, getWatchGroup, updateWatchGroup } from '../api/watchGroupData';
import { useAuth } from '../utils/context/authContext';

function LandingPage() {
  const [watchGroups, setWatchGroups] = useState([]);
  const [selectedWatchGroupId, setSelectedWatchGroupId] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getWatchGroup().then(setWatchGroups);
  }, []);

  const handleChange = (e) => {
    setSelectedWatchGroupId(e.target.value);
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    if (selectedWatchGroupId) {
      const selectedGroup = watchGroups.find((group) => group.firebaseKey === selectedWatchGroupId);
      if (selectedGroup) {
        const updatedGroup = {
          ...selectedGroup,
          userNames: [...selectedGroup.userNames, user.displayName],
          userUids: [...selectedGroup.userUids, user.uid],
        };
        updateWatchGroup(updatedGroup).then(() => {
          router.push('/');
          console.warn('Watch Group Updated');
        });
      }
    }
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const payload = { userUids: [user.uid], userNames: [user.displayName] };
    createWatchGroup(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateWatchGroup(patchPayload).then(() => {
        router.push('/');
        console.warn('Watch Group Created');
      });
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <h1>Watch Group</h1>
      <FormControl fullWidth>
        <InputLabel id="watch-group-select">Select Watch Group</InputLabel>
        <Select value={selectedWatchGroupId} onChange={handleChange}>
          {
  watchGroups.map((group) => {
    console.log(group); // to check the structure of group object
    return <MenuItem key={group.firebaseKey} value={group.firebaseKey}>{group.userNames}</MenuItem>;
  })
}

        </Select>
        <Button type="submit" onClick={handleJoinGroup}>Join Watch Group</Button>
        <Button type="submit" onClick={handleCreateGroup}>Create Watch Group</Button>
      </FormControl>
    </Box>
  );
}

LandingPage.propTypes = {
  groupObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

LandingPage.defaultProps = {
  groupObj: {},
};

export default LandingPage;
