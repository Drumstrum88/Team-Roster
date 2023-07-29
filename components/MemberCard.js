import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from './API/memberData';

function MemberCard({ memberObj, onUpdate }) {
  if (!memberObj) {
    return null;
  }

  const deleteThisMember = () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(memberObj.firebaseKey).then(onUpdate);
    }
  };

  return (
    <Card className="member-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{memberObj.firstName} {memberObj.lastName}</Card.Title>
        <Card.Text>
          {memberObj.role}
        </Card.Text>
        <Card.Text>
          {memberObj.band}
        </Card.Text>
        <Link href={`/members/${memberObj.firebaseKey}`} passHref>
          <Button className="view" variant="primary">View</Button>
        </Link>
        <Link href={`/members/Edit/${memberObj.firebaseKey}`} passHref>
          <Button className="edit" variant="info">Edit</Button>
        </Link>
        <Button className="delete" variant="danger" onClick={deleteThisMember}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    role: PropTypes.string,
    band: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
