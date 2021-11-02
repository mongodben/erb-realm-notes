import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Post } from 'types/posts';
import Context from '../Context';

type PostPreviewProps = {
  post: Post;
};

const PostPreview: React.FC<PostPreviewProps> = ({
  post,
}: PostPreviewProps) => {
  const { setCurrentPost } = useContext(Context);

  function setPostId() {
    setCurrentPost(post);
  }

  return (
    <ListGroup.Item
      onClick={() => setPostId()}
      key={`${post.uid}_${post.title}`}
    >
      {post.title}
    </ListGroup.Item>
  );
};

type PostProps = {
  posts: Post[];
};

const Posts: React.FC<PostProps> = ({ posts }: PostProps) => {
  return (
    <>
      <h2>my posts</h2>
      <ListGroup>
        {posts.map((post) => {
          return <PostPreview post={post} />;
        })}
      </ListGroup>
    </>
  );
};

export default Posts;
