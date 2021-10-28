import { UsernamePassword } from 'types/auth';
import { ipcRendererHandler } from '../ipc';

class RealmAuthentication {
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  async logIn(
    credentials: UsernamePassword
  ): Promise<UsernamePassword | null> {
    try {
      const res: UsernamePassword = await ipcRendererHandler(
        'logIn',
        credentials
      );
      if (res) {
        this.isLoggedIn = true;
      }
      return res;
    } catch (err) {
      console.error('error is...', err);
      return null;
    }
  }

  async signUp(
    credentials: UsernamePassword
  ): Promise<UsernamePassword | null> {
    try {
      const res: UsernamePassword = await ipcRendererHandler(
        'signUp',
        credentials
      );
      if (res) {
        this.isLoggedIn = true;
      }
      return res;
    } catch (err) {
      console.error('error is...', err);
      return null;
    }
  }

  static async logOut(): Promise<boolean | null> {
    try {
      const res: boolean = await ipcRendererHandler('log-out');
      return res;
    } catch (err) {
      return null;
    }
  }
}

export default RealmAuthentication;
