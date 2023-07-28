import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBand } from '../../../components/API/bandData';
import BandForm from '../../../components/bandForm';

export default function EditBand() {
  const [editBand, setEditBand] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBand(firebaseKey).then(setEditBand);
  },
  [firebaseKey]);

  return (<BandForm obj={editBand} />);
}
