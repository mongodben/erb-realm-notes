import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

type PostsProps = {
  posts: PostMeta[];
  setPostId: (val: string) => void;
};

type PostMeta = {
  title: string;
  uid: string;
};

const Post: React.FC<PostMeta> = ({ title, uid, setPostId }) => {
  function setter() {
    setPostId(uid);
  }
  return <ListGroup.Item onClick={() => setter()}>{title}</ListGroup.Item>;
};

const Posts: React.FC<PostsProps> = ({ posts, setPostId }) => {
  return (
    <>
      <h2>my posts</h2>
      <ListGroup>
        {posts.map((post) => {
          return (
            <Post title={post.title} uid={post.uid} setPostId={setPostId} />
          );
        })}
      </ListGroup>
    </>
  );
};

export default Posts;
