import { useEffect, useState } from 'react';
import User from '../components/User';
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
      <User userObject={user} />
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
