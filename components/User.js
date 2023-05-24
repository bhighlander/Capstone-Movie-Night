import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function User({ userObject }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{userObject.displayName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userObject.email}</Card.Subtitle>
        <Card.Text>
          {userObject.uid}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

User.propTypes = {
  userObject: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default User;
