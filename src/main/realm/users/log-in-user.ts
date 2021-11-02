import Realm from 'realm';
import { UsernamePassword } from 'types/auth';
import RealmWrapper from 'types/RealmWrapper';
import { openRealm } from '..';
import realmDb from '../realmDb';

let loggedInRealm: any;
async function logIn(
  app: Realm.App,
  _: RealmWrapper,
  credentials: UsernamePassword[]
) {
  const user = app.currentUser;
  // const user = app.currentUser;
  const creds = credentials[0];
  const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
    creds.username,
    creds.password
  );
  let loggedInUser;
  try {
    if (user) {
      loggedInUser = await app.logIn(emailPasswordUserCredentials);
      loggedInRealm = await openRealm();
      realmDb.isOpen = true;
      realmDb.db = loggedInRealm;
    } else {
      throw new Error('problems logging in existing user');
    }
    return true;
  } catch (err) {
    console.error('log in error is...', err);
    return err;
  }
}

export default logIn;
export {loggedInRealm};
