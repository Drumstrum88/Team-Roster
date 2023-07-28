import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createBand, getSingleBand } from './API/bandData';

const initialState = {
  BandName: '',
  description: '',
};

export default function BandForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [obj, setObj] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBand(formInput).then(() => {
      setFormInput({ ...initialState });
      router.push('/bands');
    });
  };

  useEffect(() => {
    if (id) {
      getSingleBand(id).then(setObj);
    }
  }, [id]);

  return (
    <div className="member-form">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center">{obj.firebaseKey ? 'Update Band' : 'Add Band'}</h2>

        <FloatingLabel controlId="floatingInput" label="Band Name">
          <Form.Control
            type="text"
            name="BandName"
            value={formInput.BandName}
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
          {obj.firebaseKey ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
}
