import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteListing } from '../api/listingData';

function ListingCard({ listingObj, onUpdate }) {
  const deleteThisListing = () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing(listingObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    // reimplement this as a material ui card
    // <Card style={{ width: '18rem', margin: '10px' }}>
    //   <CardMedia image={listingObj.posterUrl} />
    //   <CardContent>
    //     <Typography>{listingObj.title}</Typography>
    //     <Typography>{listingObj.description}</Typography>
    //     <Typography>{listingObj.mediaType}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Link href={`listing/edit/${listingObj.firebaseKey}`}>
    //       <Button type="button" href={`/listing/edit/${listingObj.firebaseKey}`}>Edit</Button>
    //     </Link>
    //     <Button type="button" onClick={deleteThisListing}>Delete</Button>
    //   </CardActions>
    // </Card>
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={listingObj.posterUrl} style={{ height: '300px' }} />
        <Card.Title>{listingObj.title}</Card.Title>
        <Card.Text>{listingObj.description}</Card.Text>
        <Link href={`/listing/${listingObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/listing/edit/${listingObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisListing} className="m-2">
          DELETE
        </Button>
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
    posterUrl: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ListingCard;
