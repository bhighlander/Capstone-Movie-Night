import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardMedia, CardContent, Typography,
} from '@mui/material';
import { viewListingDetails } from '../../api/mergedData';
import CommentForm from '../../form/CommentForm';
import ViewComment from '../comment/[firebaseKey]';

function ViewListing() {
  const [listingDetails, setListingDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewListingDetails(firebaseKey).then(setListingDetails);
  }, [firebaseKey]);

  console.log(listingDetails);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <CardMedia sx={{ height: '400px' }} image={listingDetails.posterUrl} />
        <CardContent>
          <Typography variant="h5" component="h1">{listingDetails.title}</Typography>
          <Typography variant="body1" component="p">{listingDetails.description}</Typography>
          <Typography variant="h6" component="h3">{listingDetails.mediaType}</Typography>

          <div className="d-flex flex-column">
            {listingDetails.comments?.map((comment) => (
              <ViewComment key={comment.firebaseKey} commentObj={comment} />
            ))}
          </div>
          <CommentForm obj={{}} listingFirebaseKey={firebaseKey} onUpdate={viewListingDetails} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewListing;
