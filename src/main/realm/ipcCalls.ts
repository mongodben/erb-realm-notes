import RealmWrapper from 'types/RealmWrapper';
import logIn from './users/log-in-user';
import signUp from './users/sign-up-user';
import createPost from './posts/create-post';
import deletePosts from './posts/delete-posts';
import getPosts from './posts/get-posts';
import updatePost from './posts/update-post';

type Map = {
  [key: string]: (app: Realm.App, realm: RealmWrapper, ...args: any[]) => any;
};

const realmIpcCalls: Map = {
  logIn,
  signUp,
  createPost,
  deletePosts,
  getPosts,
  updatePost,
};

export default realmIpcCalls;
