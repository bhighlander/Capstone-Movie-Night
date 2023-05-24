import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListingForm from '../../../form/ListingForm';
import { getSingleListing } from '../../../api/listingData';

function EditListing() {
  const [editListing, setEditListing] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleListing(firebaseKey).then(setEditListing);
  }, [firebaseKey]);
  return (
    <ListingForm obj={editListing} />
  );
}

export default EditListing;
