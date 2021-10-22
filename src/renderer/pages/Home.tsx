import Button from 'react-bootstrap/Button';
import { useHistory, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const Home = () => {
  const history = useHistory();

  return (
    <PageLayout>
      <div>
        <h1>md notez</h1>
        <p>take sum notez w markdown</p>
      </div>
      <div>
        <Button variant="primary" onClick={() => history.push('/log-in')}>
          Log In
        </Button>{' '}
        <Button variant="info" onClick={() => history.push('/sign-up')}>
          Sign Up
        </Button>{' '}
        <Link to="/write">
          <Button variant="secondary">Write</Button>{' '}
        </Link>
      </div>
    </PageLayout>
  );
};

export default Home;
