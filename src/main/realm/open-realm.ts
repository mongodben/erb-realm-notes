import Realm from 'realm';
import app from './app';
import { Note } from './schemas';

async function createConfig(schemas: any[]): Promise<any> {
  let user;
  if (!app.currentUser) {
    const credentials = Realm.Credentials.anonymous();
    user = await app.logIn(credentials);
  } else {
    user = app.currentUser;
  }

  const config = {
    schema: [...schemas],
    sync: {
      user,
      partitionValue: app.currentUser?.id,
    },
  };

  return config;
}

async function openRealm(): Promise<any> {
  const config = await createConfig([Note]);
  try {
    const realm = await Realm.open(config);
    return realm;
  } catch (err: unknown) {
    console.error('failed to open realm', err);
    return err;
  }
}

export default openRealm;
