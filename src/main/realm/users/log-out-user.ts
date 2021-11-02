import RealmWrapper from 'types/RealmWrapper';

function logOut(app: Realm.App, _: RealmWrapper, __: undefined): true | Error {
  const user = app.currentUser;
  if (user?.isLoggedIn) {
    user.logOut();
    return true;
  }
  return new Error(`unable to log out user with id: ${app.currentUser?.id}`);
}

export default logOut;
