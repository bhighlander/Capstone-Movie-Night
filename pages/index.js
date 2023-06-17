import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getListings } from '../api/listingData';
import ListingCard from '../components/ListingCard';
import { getWatchGroups } from '../api/watchGroupData';

function Home() {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();

  const getAllListings = () => {
    getListings(user.uid)
      .then((listing) => {
        getWatchGroups()
          .then((watchGroups) => {
            const userWatchGroups = watchGroups.filter((group) => group.userUids.includes(user.uid));
            const groupIds = userWatchGroups.map((group) => group.firebaseKey);
            const filteredListings = listing.filter((singleListing) => groupIds.includes(singleListing.groupId));
            setListings(filteredListings);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
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
