import Card, { Button, Link } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { deleteListing } from '../api/listingData';

function ListingCard({ listingObj, onUpdate }) {
  const deleteThisListing = () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing(listingObj.firebaseKey).then(onUpdate);
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={listingObj.photoUrl} alt={listingObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{listingObj.title}</Card.Title>
        <Card.Text>{listingObj.description}</Card.Text>
        <Card.Text>{listingObj.mediaType}</Card.Text>
        <Link href={`listing/edit/${listingObj.firebaseKey}`}>
          <Button type="button" href={`/listing/edit/${listingObj.firebaseKey}`}>Edit</Button>
        </Link>
        <Button type="button" onClick={deleteThisListing}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

ListingCard.propTypes = {
  listingObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    mediaType: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ListingCard;
