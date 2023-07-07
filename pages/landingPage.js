import {
  Box, Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createWatchGroup, getWatchGroups, updateWatchGroup } from '../api/watchGroupData';
import { useAuth } from '../utils/context/authContext';

function LandingPage() {
  const [watchGroups, setWatchGroups] = useState([]);
  const [selectedWatchGroupId, setSelectedWatchGroupId] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    getWatchGroups().then((groups) => {
      if (isMounted) {
        setWatchGroups(groups);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [watchGroups]);

  const handleChange = (e) => {
    setSelectedWatchGroupId(e.target.value);
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    if (user && selectedWatchGroupId) {
      const selectedGroup = watchGroups.find((group) => group.firebaseKey === selectedWatchGroupId);
      if (selectedGroup) {
        const updatedGroup = {
          ...selectedGroup,
          userNames: [...selectedGroup.userNames, user.displayName],
          userUids: [...selectedGroup.userUids, user.uid],
        };
        updateWatchGroup(updatedGroup).then(() => {
          console.warn('Watch Group Updated');
          router.reload();
        });
      }
    }
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (user) {
      const payload = { userUids: [user.uid], userNames: [user.displayName] };
      createWatchGroup(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateWatchGroup(patchPayload).then(() => {
          console.warn('Watch Group Created');
          router.reload();
        });
      });
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '50vh',
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Box sx={{ minWidth: 120 }}>
        <h1>Watch Group</h1>
        <p>Join or create a watch group to get started!</p>
        <FormControl fullWidth>
          <InputLabel id="watch-group-select">Select Watch Group</InputLabel>
          <Select value={selectedWatchGroupId} onChange={handleChange}>
            {watchGroups.map((group) => (
              <MenuItem key={group.firebaseKey} value={group.firebaseKey}>{group.userNames}</MenuItem>
            ))}
          </Select>
          <Button type="button" onClick={handleJoinGroup}>Join Watch Group</Button>
          <Button type="button" onClick={handleCreateGroup}>Create Watch Group</Button>
        </FormControl>
      </Box>
    </div>
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
