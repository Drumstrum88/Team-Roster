import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBands } from '../../components/API/bandData';
import { useAuth } from '../../utils/context/authContext';
import BandCard from '../../components/bandCard';

const Bands = () => {
  const [bands, setBands] = useState([]);
  const { user } = useAuth();

  const getAllBands = useCallback(() => {
    getBands(user.uid).then(setBands);
  }, [user.uid]);

  useEffect(() => {
    getAllBands();
  }, [getAllBands]);

  return (
    <div className="text-center my-0">
      <Link passHref href="../Team/new">
        <Button className="btn btn-success m-2">Add Band</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {bands.map((band) => (
          <BandCard
            key={band.firebaseKey}
            bandObj={band}
            onUpdate={getAllBands}
          />
        ))}
      </div>
    </div>
  );
};

export default Bands;
