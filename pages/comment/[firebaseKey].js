import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { getSingleComment } from '../../api/commentsData';
import CommentField from '../../components/CommentField';

function ViewComment({ commentObj }) {
  const [commentDetails, setCommentDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setCommentDetails);
  }, [firebaseKey]);

  console.log(commentDetails);

  return (
    <Card className="mt-3">
      <CardContent>
        <CommentField commentObj={commentObj} />
      </CardContent>
    </Card>
  );
}

ViewComment.propTypes = {
  commentObj: PropTypes.shape({
    commentText: PropTypes.string,
  }).isRequired,
};

export default ViewComment;
