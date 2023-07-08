import React from 'react';
import PropTypes from 'prop-types';
// import { Button, Card } from 'react-bootstrap';
// import Link from 'next/link';
import {
  Button,
  Card,
  CardActions, CardContent, CardMedia, Link, Typography,
} from '@mui/material';
import { useAuth } from '../utils/context/authContext';

function ListingCard({ listingObj }) {
  const { user } = useAuth();
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <CardMedia sx={{ height: '400px' }} image={listingObj.posterUrl} />
      <CardContent>
        <Typography variant="h6">{listingObj.title}</Typography>
        <br />
        <Typography variant="body1" className="listing-card-description">{listingObj.description}</Typography>
        <br />
        <Typography>{listingObj.mediaType}</Typography>
      </CardContent>
      <CardActions>
        <Link href={`/listing/${listingObj.firebaseKey}`}>
          <Button type="button" href={`/listing/${listingObj.firebaseKey}`}>View</Button>
        </Link>
        {listingObj.uid === user.uid && (
        <Link href={`listing/edit/${listingObj.firebaseKey}`}>
          <Button type="button" href={`/listing/edit/${listingObj.firebaseKey}`}>Edit</Button>
        </Link>
        )}
      </CardActions>
    </Card>
  );
}

ListingCard.propTypes = {
  listingObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    mediaType: PropTypes.string,
    posterUrl: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default ListingCard;
