import React from 'react';
import PropTypes from 'prop-types';
// import { Button, Card } from 'react-bootstrap';
// import Link from 'next/link';
import {
  Button,
  Card,
  CardActions, CardContent, CardMedia, Link, Typography,
} from '@mui/material';

function ListingCard({ listingObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <CardMedia sx={{ height: '400px' }} image={listingObj.posterUrl} />
      <CardContent>
        <Typography>{listingObj.title}</Typography>
        <Typography>{listingObj.description}</Typography>
        <Typography>{listingObj.mediaType}</Typography>
      </CardContent>
      <CardActions>
        <Link href={`/listing/${listingObj.firebaseKey}`}>
          <Button type="button" href={`/listing/${listingObj.firebaseKey}`}>View</Button>
        </Link>
        <Link href={`listing/edit/${listingObj.firebaseKey}`}>
          <Button type="button" href={`/listing/edit/${listingObj.firebaseKey}`}>Edit</Button>
        </Link>
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
  }).isRequired,
};

export default ListingCard;
