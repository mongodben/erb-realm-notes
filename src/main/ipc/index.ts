import Realm from 'realm';
import RealmWrapper from 'types/RealmWrapper';
import {realmIpcCalls } from '../realm';

function callRealm(
  app: Realm.App,
  realm: RealmWrapper,
  event: any,
  ...args: any[]
) {
  if(realmIpcCalls[event]){
    return realmIpcCalls[event](app, realm, ...args);
  } else{
    throw new Error("event does not exist in realmIpcCalls");
  }
}

export { callRealm };


