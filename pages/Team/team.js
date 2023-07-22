import { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../components/API/memberData';
import MemberCard from '../../components/MemberCard';
import SearchBar from '../../components/search';

function Team() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const getAllMembers = useCallback(() => {
    getMembers(user.uid).then(setMembers);
  }, [user.uid]);

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  const handleSearch = (query) => {
    const filteredMembers = members.filter((member) => member.firstName.toLowerCase().includes(query.toLowerCase())
    || member.lastName.toLowerCase().includes(query.toLowerCase())
    || member.role.toLowerCase().includes(query.toLowerCase()));
    setMembers(filteredMembers);
  };

  return (
    <div className="text-center mt-4">
      <h1>Your Bandmates!</h1>
      <div className="d-flex justify-content-center">
        <SearchBar onSearch={handleSearch} />
      </div>
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
