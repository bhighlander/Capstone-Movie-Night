import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardMedia, CardContent, Typography, CardActions, Button, Link,
} from '@mui/material';
import PropTypes from 'prop-types';
import { deleteListingComments, viewListingDetails } from '../../api/mergedData';
import CommentForm from '../../form/CommentForm';
import CommentField from '../../components/CommentField';

function ViewListing({ onUpdate }) {
  const [listingDetails, setListingDetails] = useState({});
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListingComments(firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    viewListingDetails(firebaseKey).then(setListingDetails);
  }, [firebaseKey]);

  useEffect(() => {
    if (commentsUpdated) {
      viewListingDetails(firebaseKey).then(setListingDetails);
      setCommentsUpdated(false);
    }
  }, [commentsUpdated, firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <CardMedia sx={{ height: '400px' }} image={listingDetails.posterUrl} />
        <CardActions>
          <Link href={`listing/edit/${firebaseKey}`}>
            <Button type="button" href={`/listing/edit/${firebaseKey}`}>Edit</Button>
          </Link>
          <Button type="button" onClick={handleDelete}>Delete</Button>
        </CardActions>
        <CardContent>
          <Typography variant="h5" component="h1">{listingDetails.title}</Typography>
          <Typography variant="body1" component="p">{listingDetails.description}</Typography>
          <Typography variant="h6" component="h3">{listingDetails.mediaType}</Typography>

          <div className="d-flex flex-column">
            {listingDetails.comments && listingDetails.comments.filter((comment) => comment.date).sort((b, a) => a.date.localeCompare(b.date)).map((comment) => (
              <CommentField key={comment.firebaseKey} commentObj={comment} setCommentsUpdated={setCommentsUpdated} />
            ))}
          </div>
          <CommentForm obj={{}} listingFirebaseKey={firebaseKey} onUpdate={viewListingDetails} setCommentsUpdated={setCommentsUpdated} />
        </CardContent>
      </Card>
    </div>
  );
}

ViewListing.propTypes = {
  listingObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    mediaType: PropTypes.string,
    posterUrl: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

ViewListing.defaultProps = { listingObj: {}, onUpdate: () => {} };

ViewListing.defaultProps = { onUpdate: () => {} };

export default ViewListing;
