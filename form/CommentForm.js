import { Button, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
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
  });

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
        });
    } else {
      const payload = { ...formInput };
      createComment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload).then(() => {
          setNewComment('');
          setCommentsUpdated(true);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          label="Add a comment"
          name="commentText"
          multiline
          rows={4}
          value={newComment}
          onChange={handleCommentChange}
          variant="outlined"
          style={{ margin: '10px' }}
        />
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>Add Comment</Button>
      <Button variant="contained" onClick={onCancel}>Cancel</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
  listingFirebaseKey: PropTypes.string.isRequired,
  setCommentsUpdated: PropTypes.func,
  onCancel: PropTypes.func,
};

CommentForm.defaultProps = {
  setCommentsUpdated: () => {},
  onCancel: () => {},
};

export default CommentForm;
