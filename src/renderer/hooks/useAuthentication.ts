import { RealmAuthentication } from 'renderer/data-access';

const auth = new RealmAuthentication();

function useAuthentication(): RealmAuthentication {
  return auth;
}

export default useAuthentication;
