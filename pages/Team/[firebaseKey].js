import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewBandDetails } from '../../components/API/mergedData';
import MemberCard from '../../components/MemberCard';

export default function BandDetailsPage() {
  const [bandData, setBandData] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      viewBandDetails(firebaseKey)
        .then((data) => setBandData(data))
        .catch((error) => {
          console.warn('No band details available:', error);
          setBandData(null);
        });
    }
  }, [firebaseKey]);

  if (!bandData) {
    return <h2>Band Details Not Available</h2>;
  }

  const {
    name, description, members,
  } = bandData;

  return (
    <div>
      <h1>Band Details:</h1>
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>Members of {name} Band:</h3>
      {Array.isArray(members) && members.length > 0 ? (
        members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} />
        ))
      ) : (
        <p>No Members</p>
      )}
    </div>
  );
}
