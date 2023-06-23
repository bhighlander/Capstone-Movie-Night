import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBarAuth from '../components/NavBarAuth';
import LandingPage from '../pages/landingPage';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, userInGroup } = useAuth();

  if (userLoading && userInGroup === false) {
    return <Loading />;
  }
  console.log(userInGroup, 'isUserInGroups', user, 'user');

  if (user && userInGroup === false) {
    return <LandingPage user={user} />;
  }
  if (user && userInGroup !== false) {
  // if (user) {
    return (
      <>
        <NavBarAuth user={user} />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }
  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.func.isRequired,
  isUserInGroups: PropTypes.bool.isRequired,
};
