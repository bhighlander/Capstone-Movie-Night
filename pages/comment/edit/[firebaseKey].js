import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleComment } from '../../../api/commentsData';
import CommentForm from '../../../form/CommentForm';

function EditComment() {
  const [editComment, setEditComment] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setEditComment);
  }, [firebaseKey]);

  return (
    <CommentForm obj={editComment} />
  );
}

export default EditComment;
