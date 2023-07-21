import { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../components/API/memberData';
import MemberCard from '../../components/MemberCard';

function Team() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const getAllMembers = useCallback(() => {
    getMembers(user.uid).then(setMembers);
  }, [user.uid]);

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  return (
    <div className="text-center mt-4">
      <h1>The Team!</h1>
      <Link href="/members/new" passHref>
        <Button className="add-member" variant="primary" type="button">
          Add Member
        </Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {members.map((member) => (
          <MemberCard
            key={member.firebaseKey}
            memberObj={member}
            onUpdate={getAllMembers}
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
