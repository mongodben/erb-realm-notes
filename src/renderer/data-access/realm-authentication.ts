import { UsernamePassword } from 'types/auth';
const { ipcRenderer } = window.require('electron');

class RealmAuthentication {
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  async logIn(
    credentials: UsernamePassword
  ): Promise<UsernamePassword | Error> {
    try {
      const res: UsernamePassword = await ipcRenderer.invoke(
        'log-in',
        credentials
      );
      if (res) {
        this.isLoggedIn = true;
      }
      return res;
    } catch (err) {
      console.error('error is...', err);
      return new Error('could not log in user');
    }
  }

  static async logOut(): Promise<boolean | Error> {
    try {
      const res: boolean = await ipcRenderer.invoke('log-out');
      return res;
    } catch (err) {
      return new Error('could not log in user');
    }
  }
}

export default RealmAuthentication;
