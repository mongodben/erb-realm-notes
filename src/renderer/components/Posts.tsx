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

type PostMetaWithSetter = {
  meta: PostMeta;
  setter: (val: string) => void;
};

const Post: React.FC<PostMetaWithSetter> = ({ meta, setter }) => {
  function setPostId() {
    setter(meta.uid);
  }
  return (
    <ListGroup.Item onClick={() => setPostId()}>{meta.title}</ListGroup.Item>
  );
};

const Posts: React.FC<PostsProps> = ({ posts, setPostId }) => {
  return (
    <>
      <h2>my posts</h2>
      <ListGroup>
        {posts.map((post) => {
          return <Post meta={post} setter={setPostId} key={post.uid} />;
        })}
      </ListGroup>
    </>
  );
};

export default Posts;
