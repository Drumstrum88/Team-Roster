import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../components/API/memberData';
import Loading from '../../components/Loading';

export default function MemberDetails() {
  const [memberData, setMemberData] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      getSingleMember(firebaseKey)
        .then(setMemberData)
        .catch((err) => console.warn('no member', err));
    }
  }, [firebaseKey]);
  if (!memberData.firebaseKey) {
    return <Loading />;
  }

  return (
    <div className="single-member">
      <h1>Member Details</h1>
      <h3>Band Member: {memberData.firstName} {memberData.lastName}</h3>
      <h4>Email: {memberData.email}</h4>
      <h4>Band: {memberData.band}</h4>
      <h4>Role: {memberData.role}</h4>
    </div>
  );
}
