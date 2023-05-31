import { Button, FormControl, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createComment, updateComment } from '../api/commentsData';

function CommentForm({ obj, listingFirebaseKey }) {
  const [formInput, setFormInput] = useState({
    commentText: '',
    uid: '',
    listingId: listingFirebaseKey,
  });
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const { user } = useAuth();

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
      updateComment(formInput)
        .then(() => router.push(`/listing/${listingFirebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createComment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload).then(() => {
          router.push(`/listing/${listingFirebaseKey}`);
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
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
  listingFirebaseKey: PropTypes.string.isRequired,
};

export default CommentForm;
