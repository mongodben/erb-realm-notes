import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Context from '../Context';

const Home = () => {
  const history = useHistory();
  const { loggedIn } = useContext(Context);

  return (
    <PageLayout>
      <div>
        <h1>md notez</h1>
        <p>take sum notez w markdown</p>
      </div>
      <div>
        {loggedIn ? (
          <Link to="/write">
            <Button variant="secondary">Write</Button>{' '}
          </Link>
        ) : (
          <>
            <Button variant="primary" onClick={() => history.push('/log-in')}>
              log in
            </Button>{' '}
            <Button variant="info" onClick={() => history.push('/sign-up')}>
              sign up
            </Button>{' '}
          </>
        )}
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
