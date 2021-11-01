import Realm from 'realm';
import { UsernamePassword } from 'types/auth';
import RealmWrapper from 'types/RealmWrapper';
import { openRealm } from '..';
let loggedInRealm: any;
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
    if (user) {
      loggedInUser = await app.logIn(emailPasswordUserCredentials);
      loggedInRealm = await openRealm();
    } else {
      console.log('issues, uh oh :(');
      throw new Error('problems logging in existing user');
    }
    console.log('user is...', loggedInUser);
    return true;
  } catch (err) {
    console.error('log in error is...', err);
    return err;
  }
}

export default logIn;
export {loggedInRealm};
