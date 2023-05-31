import React from 'react';
import Link from 'next/link';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Home, Person, AddCircle, ExitToApp,
} from '@mui/icons-material';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <BottomNavigation showLabels>
      <Link passHref href="/">
        <BottomNavigationAction label="Home" icon={<Home />} />
      </Link>
      <Link passHref href="/profile">
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </Link>
      <Link passHref href="/listing/new">
        <BottomNavigationAction label="New Listing" icon={<AddCircle />} />
      </Link>
      <BottomNavigationAction label="Sign Out" icon={<ExitToApp />} onClick={handleSignOut} />
    </BottomNavigation>
  );
}
