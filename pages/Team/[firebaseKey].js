import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBand, getBandMembers } from '../../components/API/bandData';

const BandDetailsPage = () => {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [band, setBand] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (firebaseKey) {
      getSingleBand(firebaseKey)
        .then((bandData) => {
          setBand(bandData);
        })
        .catch((error) => console.error(error));

      getBandMembers(firebaseKey)
        .then((membersData) => {
          setMembers(membersData);
        })
        .catch((error) => console.error(error));
    }
  }, [firebaseKey]);

  if (!band) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Band Details</h1>
      <h2>{band.name}</h2>
      <p>{band.description}</p>
      <h3>Band Members:</h3>
      <ul>
        {members.map((member) => (
          <li key={member.firebaseKey}>
            {member.firstName} {member.lastName} - {member.role}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default BandDetailsPage;
