import posts from './sample-posts';

interface Post {
  uid: string;
  title: string;
  body?: string;
}

function getPostById(uid: string | undefined): Post | undefined {
  if (!uid) return;

  return posts.find((el) => el.uid === uid);
}

export default getPostById;
