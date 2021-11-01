import Realm from 'realm';
import { UsernamePassword } from 'types/auth';
import RealmWrapper from 'types/RealmWrapper';

async function signUpUser(
  app: Realm.App,
  _: RealmWrapper,
  credentials: UsernamePassword[]
) {
  const creds = credentials[0];
  try {
    const loggedInUser = await app.emailPasswordAuth.registerUser(
      creds.username,
      creds.password
    );

    return loggedInUser;
  } catch (err) {
    console.error('log in error is...', err);
    return err;
  }
}

export default signUpUser;
