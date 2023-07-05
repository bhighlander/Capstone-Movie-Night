import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, Button,
} from '@mui/material';
import CommentForm from '../form/CommentForm';
import { deleteComment } from '../api/commentsData';
import { useAuth } from '../utils/context/authContext';

function CommentField({ commentObj, onUpdate, setCommentsUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

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
            <Typography variant="h6" component="h3">
              {commentObj.creator}
            </Typography>
            <br />
            <Typography variant="body1" component="p">
              {commentObj.commentText || 'Blue'}
            </Typography>
            <br />
            {commentObj.uid === user.uid ? (
              <>
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            ) : null}
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
    creator: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
  setCommentsUpdated: PropTypes.func,
};

CommentField.defaultProps = {
  onUpdate: () => {},
  setCommentsUpdated: () => {},
};

export default CommentField;
