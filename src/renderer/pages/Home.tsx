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
      <div>
        <h2>features</h2>
        <ul>
          <li>work with notes locally, even when not connected to internet</li>
          <li>sync when online</li>
          <li>save notes by user</li>
          <li>create, update, and delete notes</li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default Home;
