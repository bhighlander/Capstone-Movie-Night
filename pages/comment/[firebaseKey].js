import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { getSingleComment } from '../../api/commentsData';

function ViewComment() {
  const [commentDetails, setCommentDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setCommentDetails);
  }, [firebaseKey]);

  console.log(commentDetails);

  return (
    <Card className="mt-5">
      <CardContent>
        <p>{commentDetails?.commentText || 'Blue'}</p>
      </CardContent>
    </Card>
  );
}

export default ViewComment;
