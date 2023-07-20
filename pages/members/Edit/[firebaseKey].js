import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleMember } from '../../../components/API/memberData';
import MemberForm from '../../../components/memberForm';

export default function EditMember() {
  const [editMember, setEditMember] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditMember);
  }, [firebaseKey]);

  return (<MemberForm obj={editMember} />);
}
