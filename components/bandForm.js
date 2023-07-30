import { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createBand, updateBand, getBands } from './API/bandData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  bandName: '',
  description: '',
};

function BandForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bands, setBands] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getBands(user.uid).then(setBands);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBand(formInput).then(() => router.push(`/band/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBand(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateBand(patchPayload).then(() => {
        });
      });
    }
  };

  return (
    <div className="band-creation-form">
      {bands.map((band) => (
        <div key={band.firebaseKey}>
          <p>Band Name: {band.bandName}</p>
          <p>Description: {band.description}</p>
        </div>
      ))}
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center">Add New Band</h2>

        <FloatingLabel controlId="floatingInput" label="Band Name">
          <Form.Control
            type="text"
            name="bandName"
            value={formInput.bandName}
            onChange={handleChange}
            placeholder="Band Name"
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Description">
          <Form.Control
            type="text"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </FloatingLabel>

        <Button className="submit-form" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

BandForm.propTypes = {
  obj: PropTypes.shape({
    bandName: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BandForm.defaultProps = {
  obj: initialState,
};

export default BandForm;
