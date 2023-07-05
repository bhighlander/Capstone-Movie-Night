import { Button, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createComment, updateComment } from '../api/commentsData';

function CommentForm({
  obj, listingFirebaseKey, setCommentsUpdated, onCancel,
}) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const currentDate = new Date().toISOString();
  const [formInput, setFormInput] = useState({
    commentText: '',
    uid: user.uid,
    listingId: listingFirebaseKey,
    date: currentDate,
    firebaseKey: obj.firebaseKey,
    creator: user.displayName,
  });
  const [showCommentField, setShowCommentField] = useState(false);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateComment({ ...formInput })
        .then(() => {
          setNewComment('');
          setCommentsUpdated(true);
          onCancel();
          setShowCommentField(false);
        });
    } else {
      const payload = { ...formInput };
      createComment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload).then(() => {
          setNewComment('');
          setCommentsUpdated(true);
          setShowCommentField(false);
        });
      });
    }
  };

  const handleNewComment = () => {
    setShowCommentField(true);
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setShowCommentField(true);
    }
  }, [obj.firebaseKey]);

  return (
    <>
      {!showCommentField && (
        <div>
          <br />
          <Button variant="contained" color="primary" onClick={handleNewComment}>
            New Comment
          </Button>
        </div>
      )}
      {showCommentField && (
        <Form onSubmit={handleSubmit}>
          <br />
          <FormControl>
            <TextField
              label="Add a comment"
              name="commentText"
              multiline
              rows={4}
              value={newComment}
              onChange={handleCommentChange}
              required
            />
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            {obj.firebaseKey ? 'Save Changes' : 'Add Comment'}
          </Button>
          {obj.firebaseKey && (
            <Button variant="contained" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Form>
      )}
    </>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
  listingFirebaseKey: PropTypes.string,
  setCommentsUpdated: PropTypes.func,
  onCancel: PropTypes.func,
};

CommentForm.defaultProps = {
  setCommentsUpdated: () => {},
  listingFirebaseKey: '',
  onCancel: () => {},
};

export default CommentForm;
