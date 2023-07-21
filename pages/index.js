import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="home">
        <h1>Hi, {user.displayName}!</h1>
        <h2>Welcome to the Band Manager!</h2>
        <Link href="/Team/team" passHref>
          <Button variant="primary">Meet The Team!</Button>
        </Link>
      </div>

    </>
  );
}

export default Home;
