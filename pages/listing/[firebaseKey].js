import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ListingCard from '../../components/ListingCard';
import { getSingleListing } from '../../api/listingData';

function ViewListing() {
  const [listingDetails, setListingDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleListing(firebaseKey).then(setListingDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div>
        <h1>{listingDetails.title}</h1>
      </div>
      {listingDetails.books?.map((listing) => (
        <ListingCard key={listing.firebaseKey} listingObj={listing} onUpdate={getSingleListing} />
      ))}
    </div>
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

export default ViewListing;
