import { Card, Link } from '@mui/material';
import React from 'react';
import { deleteListing } from '../api/listingData';

function listingObjCard({ listingObj, onUpdate }) {
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
        <button variant='info' href={`/listing/edit/${listingObj.firebaseKey}`} passHref>Edit</button>
        <button variant="danger" onClick={deleteThisListing}>Delete</button>
      </Card.Body>
    </Card>
  );
}

export default listingObjCard;
