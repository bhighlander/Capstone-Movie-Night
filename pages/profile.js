import { useEffect, useState } from 'react';
import { getUserListings } from '../api/listingData';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../utils/context/authContext';

function Profile() {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();
  const getAllListings = () => {
    getUserListings(user.uid).then(setListings);
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <img src={user.photoURL} alt="Profile" className="rounded-circle me-3" width="64" height="64" />
        <div>
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="text-center m-4">
        <div className="d-flex flex-wrap">
          {listings.map((listing) => (
            <ListingCard key={listing.firebaseKey} listingObj={listing} onUpdate={getAllListings} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
