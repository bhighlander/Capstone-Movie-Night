import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FormControl, FormControlLabel, FormLabel, Radio, TextField, RadioGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
// import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createListing, getListings, updateListing } from '../api/listingData';

const initialState = {
  posterUrl: '',
  title: '',
  description: '',
  mediaType: '',
};

function ListingForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getListings(user.uid).then();
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
            defaultValue="show"
            name="mediaType"
            row
            value={formInput.mediaType}
            onChange={handleInputChange}
            required
          >
            <FormControlLabel
              value="Show"
              control={<Radio />}
              label="TV Show"
            />
            <FormControlLabel
              value="Movie"
              control={<Radio />}
              label="Movie"
            />
          </RadioGroup>
        </FormControl>
        <button type="submit">Submit</button>
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
