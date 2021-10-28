import RealmWrapper from 'types/RealmWrapper';
import logIn from './log-in-user';
import signUp from './sign-up-user';

type Map = {
  [key: string]: (app: Realm.App, realm: RealmWrapper, ...args: any[]) => any;
};

const realmIpcCalls: Map = {
  logIn,
  signUp,
};

export default realmIpcCalls;
