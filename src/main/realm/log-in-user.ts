import Realm from 'realm';
import { UsernamePassword } from 'types/auth';
import RealmWrapper from 'types/RealmWrapper';

async function logIn(
  app: Realm.App,
  _: RealmWrapper,
  credentials: UsernamePassword[]
) {
  const user = app.currentUser;
  // const user = app.currentUser;
  const creds = credentials[0];
  console.log('creds are', creds);
  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    creds.username,
    creds.password
  );
  console.log('realm credentials are', emailPasswordUserCredentials);
  let loggedInUser;
  try {
    if (user && user.isLoggedIn) {
      loggedInUser = await user?.linkCredentials(emailPasswordUserCredentials);
    } else throw new Error('problems logging in existing user');
    return loggedInUser;
  } catch (err) {
    console.error('log in error is...', err);
    return err;
  }
}

export default logIn;
