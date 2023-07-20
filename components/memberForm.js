import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createMember, getMembers, updateMember } from './API/memberData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMembers(user.uid).then(setMembers);
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
      updateMember(formInput).then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center">{obj.firebaseKey ? 'Update Member' : 'Add Member'}</h2>

      <FloatingLabel controlId="floatingInput" label="First Name">
        <Form.Control
          type="text"
          name="firstName"
          value={formInput.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Last Name">
        <Form.Control
          type="text"
          name="lastName"
          value={formInput.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Email">
        <Form.Control
          type="email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Role">
        <Form.Control
          type="text"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        {obj.firebaseKey ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
