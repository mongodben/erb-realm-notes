import posts from './sample-posts';

interface Post {
  uid: string;
  title: string;
  body?: string;
}
const emptyPost: Post = {
  uid: '',
  title: 'new post',
  body: '# my new post',
};

function getPostById(uid: string | undefined): Post {
  if (!uid) {
    return emptyPost;
  }

  return posts.find((el) => el.uid === uid) || emptyPost;
}

export default getPostById;
