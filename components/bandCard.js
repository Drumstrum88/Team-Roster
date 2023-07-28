import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBand } from './API/bandData';

function BandCard({ bandObj, onUpdate }) {
  if (!bandObj) {
    return <p>No band data available.</p>;
  }

  const {
    name, description, firebaseKey,
  } = bandObj;

  const deleteThisBand = () => {
    if (window.confirm('Are you sure you want to delete this band?')) {
      deleteBand(bandObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Link href={`/Team/${firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            Band Details
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBand} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BandCard.propTypes = {
  bandObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

BandCard.defaultProps = {
  bandObj: null,
  onUpdate: () => {},
};

export default BandCard;
