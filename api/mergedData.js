import { deleteComment } from './commentsData';
import { deleteSingleListing, getListingComments, getSingleListing } from './listingData';

const viewListingDetails = (listingFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleListing(listingFirebaseKey), getListingComments(listingFirebaseKey)])
    .then(([listingObject, listingCommentsArray]) => {
      resolve({ ...listingObject, comments: listingCommentsArray });
    }).catch((error) => reject(error));
});

const deleteListingComments = (listingId) => new Promise((resolve, reject) => {
  getListingComments(listingId).then((commentsArray) => {
    console.warn(commentsArray, 'Listing Comments');
    const deleteCommentPromises = commentsArray.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleListing(listingId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewListingDetails, deleteListingComments };
