import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createMember, getMembers, updateMember } from './API/memberData';

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [members, setMembers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getMembers().then(setMembers);
    if (obj.firebaseKey) setFormInput(obj); // Use 'obj' to set the form input if it has a firebaseKey
  }, [obj]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: members.uid };
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
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
