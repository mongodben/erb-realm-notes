import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { getPostById } from 'renderer/data-access';
import { PostsProps, PostMeta } from 'types/posts';
import Context from '../Context';

const Post: React.FC<PostMeta> = ({ uid, title }) => {
  const { setCurrentPost } = useContext(Context);

  function setPostId() {
    const post = getPostById(uid);
    setCurrentPost(post);
  }
  return <ListGroup.Item onClick={() => setPostId()}>{title}</ListGroup.Item>;
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <>
      <h2>my posts</h2>
      <ListGroup>
        {posts.map((post) => {
          return (
            <Post
              uid={post.uid}
              title={post.title}
              key={`${post.uid}_${post.title}`}
            />
          );
        })}
      </ListGroup>
    </>
  );
};

export default Posts;
