import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleListing } from '../../api/listingData';

function ViewListing() {
  const [listingDetails, setListingDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleListing(firebaseKey).then(setListingDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column text-white ms-5 details">
        <img src={listingDetails.posterUrl} alt={listingDetails.title} width="300px" />
        <h5>{listingDetails.title}</h5>
        Description: {listingDetails.description}
      </div>
    </div>
  );
}

export default ViewListing;
