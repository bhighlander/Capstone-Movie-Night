import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, Button,
} from '@mui/material';
import CommentForm from '../form/CommentForm';
import { deleteComment } from '../api/commentsData';

function CommentField({ commentObj, onUpdate, setCommentsUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => {
        onUpdate();
        setCommentsUpdated(true);
      });
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
          setCommentsUpdated={setCommentsUpdated}
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
  setCommentsUpdated: PropTypes.func,
};

CommentField.defaultProps = {
  onUpdate: () => {},
  setCommentsUpdated: () => {},
};

export default CommentField;
