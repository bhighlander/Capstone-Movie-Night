import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FormControl, FormControlLabel, FormLabel, Radio, TextField, RadioGroup, Button, Autocomplete,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createListing, getListings, updateListing } from '../api/listingData';
import { getWatchGroups } from '../api/watchGroupData';
import apiSearch from '../api/searchData';
import useDebounce from '../hooks/useDebounce';

const initialState = {
  posterUrl: '',
  title: '',
  description: '',
  mediaType: '',
  groupId: '',
};

function ListingForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const debouncedSearch = useDebounce(searchQuery, 1000);

  useEffect(() => {
    getListings(user.uid).then();
    if (obj.firebaseKey) setFormInput(obj);

    getWatchGroups(user.uid).then((groups) => {
      const matchingGroup = groups.find((group) => group.userUids.includes(user.uid));
      if (matchingGroup) {
        setFormInput((prevState) => ({
          ...prevState,
          groupId: matchingGroup.firebaseKey,
        }));
      }
    }).catch((error) => {
      console.error('Error getting watch groups: ', error);
    });
  }, [obj, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const search = async () => {
      if (searchQuery.length > 0) {
        const { results } = await apiSearch(debouncedSearch);
        setSearchResults(results);
        console.log(results);
      } else {
        setSearchResults([]);
      }
    };

    search();
  }, [debouncedSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateListing(formInput)
        .then(() => router.push(`/listing/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createListing(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateListing(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        id="search"
        disableClearable
        options={searchResults?.map((option) => option.title || option.name)}
        onInputChange={(event, newInputValue) => {
          setSearchQuery(newInputValue);
        }}
        onChange={(event, value) => {
          const selectedMedia = searchResults.find((media) => media.title === value || media.name === value);

          if (selectedMedia) {
            setFormInput({
              ...formInput,
              posterUrl: `https://image.tmdb.org/t/p/original${selectedMedia.poster_path}`,
              title: selectedMedia.title || selectedMedia.name,
              description: selectedMedia.overview,
              mediaType: selectedMedia.media_type === 'movie' ? 'movie' : 'show',
            });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <br />
      <Form onSubmit={handleSubmit}>
        <h2 className="form-title">{obj.firebaseKey ? 'Update' : 'Create'} Listing</h2>
        <FormControl>
          <TextField
            id="outlined-basic"
            name="posterUrl"
            value={formInput.posterUrl}
            label="Poster"
            variant="outlined"
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-basic"
            name="title"
            value={formInput.title}
            label="Title"
            variant="outlined"
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-basic"
            name="description"
            value={formInput.description}
            label="Description"
            variant="outlined"
            onChange={handleInputChange}
            required
          />

        </FormControl>
        <FormControl>
          <FormLabel id="mediaType">Type</FormLabel>
          <RadioGroup
            aria-labelledby="mediaType"
            defaultValue={formInput.mediaType}
            name="mediaType"
            row
            value={formInput.mediaType}
            onChange={handleInputChange}
            required
          >
            <FormControlLabel
              value="show"
              control={<Radio />}
              label="TV Show"
            />
            <FormControlLabel
              value="movie"
              control={<Radio />}
              label="Movie"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Listing</Button>
      </Form>
    </>
  );
}

ListingForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    posterUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    mediaType: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ListingForm.defaultProps = {
  obj: {},
};

export default ListingForm;
