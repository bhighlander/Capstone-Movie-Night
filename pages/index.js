import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getListings } from '../api/listingData';
import ListingCard from '../components/ListingCard';

function Home() {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();

  const getAllListings = () => {
    getListings(user.uid).then(setListings);
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className="text-center m-4">
      <div className="d-flex flex-wrap">
        {listings.map((listing) => (
          <ListingCard key={listing.firebaseKey} listingObj={listing} onUpdate={getAllListings} />
        ))}
      </div>
    </div>
  );
}

export default Home;
