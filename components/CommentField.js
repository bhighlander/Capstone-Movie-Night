import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, Button,
} from '@mui/material';
import CommentForm from '../form/CommentForm';
import { deleteComment } from '../api/commentsData';

function CommentField({ commentObj, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <CommentForm
          obj={commentObj}
          onUpdate={onUpdate}
          onCancel={handleCancel}
        />
      ) : (
        <Card className="mt-3">
          <CardContent>
            <Typography variant="body1" component="p">
              {commentObj.commentText || 'Blue'}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}

CommentField.propTypes = {
  commentObj: PropTypes.shape({
    commentText: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
};

CommentField.defaultProps = { onUpdate: () => {} };

export default CommentField;
