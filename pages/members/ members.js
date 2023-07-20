import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../components/API/memberData';
import MemberCard from '../../components/MemberCard';

function Members() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = useCallback(() => {
    getMembers(user.uid).then(setMembers);
  }, [user.uid]);

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Link href="/members/new" passHref>
        <Button variant="primary" type="button">
          Add Member
        </Button>
      </Link>
      {members.map((member) => (
        <MemberCard
          key={member.firebaseKey}
          memberObj={member}
          onUpdate={getAllMembers}
        />
      ))}
    </div>
  );
}

export default Members;
