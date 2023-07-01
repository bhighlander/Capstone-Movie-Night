// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebase } from '../client';
import { checkIfUserInGroups } from '../../api/mergedData';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userInGroup, setUserInGroup] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        const { isUserInGroups } = await checkIfUserInGroups(fbUser.uid);
        if (isUserInGroups) {
          setUser(fbUser);
          setUserInGroup(true);
          console.warn('User in group');
        } else {
          setUser(fbUser);
          setUserInGroup(false);
          console.warn('User not in group');
        }
      } else {
        setUser(false);
        console.warn('No user');
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
      userInGroup,
    }),
    [user, userInGroup],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
