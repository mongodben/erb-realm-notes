import Realm from 'realm';
import { UsernamePassword } from 'types/auth';
import app from './app';

async function logIn(credentials: UsernamePassword) {
  const user = app.currentUser;

  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    credentials.username,
    credentials.password
  );
  try {
    const linkedAccount = await user?.linkCredentials(
      emailPasswordUserCredentials
    );
    return linkedAccount;
  } catch (err) {
    return err;
  }
}

export default logIn;
