import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardMedia, CardContent, Typography, CardActions, Button, Link,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import { deleteListingComments, viewListingDetails } from '../../api/mergedData';
import CommentForm from '../../form/CommentForm';
import CommentField from '../../components/CommentField';
import { useAuth } from '../../utils/context/authContext';

function ViewListing({ onUpdate }) {
  const [listingDetails, setListingDetails] = useState({});
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (shouldDelete) => {
    if (shouldDelete) {
      deleteListingComments(firebaseKey)
        .then(() => {
          onUpdate();
          router.push('/');
        });
    }
    setOpen(false);
  };

  const handleDelete = () => {
    handleOpen();
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
          {listingDetails.uid === user.uid && (
          <>
            <Link href={`listing/edit/${firebaseKey}`}>
              <Button type="button" href={`/listing/edit/${firebaseKey}`}>Edit</Button>
            </Link>
            <Button type="button" onClick={handleDelete}>Delete</Button>
          </>
          )}
        </CardActions>
        <CardContent>
          <Typography variant="h5" component="h1">{listingDetails.title}</Typography>
          <br />
          <Typography variant="body1" component="p">{listingDetails.description}</Typography>
          <br />
          <Typography variant="h6" component="h3">{listingDetails.mediaType}</Typography>
          <br />
          <div className="d-flex flex-column">
            {listingDetails.comments && listingDetails.comments.filter((comment) => comment.date).sort((b, a) => a.date.localeCompare(b.date)).map((comment) => (
              <CommentField key={comment.firebaseKey} commentObj={comment} setCommentsUpdated={setCommentsUpdated} />
            ))}
          </div>
          <CommentForm obj={{}} listingFirebaseKey={firebaseKey} onUpdate={viewListingDetails} setCommentsUpdated={setCommentsUpdated} />
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this listing?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
