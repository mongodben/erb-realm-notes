import app from './app';

function logOut() {
  const user = app.currentUser;
  if (user?.isLoggedIn) {
    user.logOut();
  }
}

export default logOut;
