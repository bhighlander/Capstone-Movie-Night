import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, Button,
} from '@mui/material';

function CommentField({ commentObj }) {
  const handleEdit = () => {
    // Add code to handle edit button click
  };

  const handleDelete = () => {
    // Add code to handle delete button click
  };

  return (
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
  );
}

CommentField.propTypes = {
  commentObj: PropTypes.shape({
    commentText: PropTypes.string,
  }).isRequired,
};

export default CommentField;
