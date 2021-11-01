import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { PostsCrud } from 'renderer/data-access';
import Context from 'renderer/Context';
import { Post } from 'types/posts';

const MetaEditor: React.FC = () => {
  const { currentPost, setCurrentPost } = useContext(Context);

  function createPost() {
    const emptyPost: Post = {
      uid: '',
      title: 'new post',
      body: '# my new post',
    };
    setCurrentPost(emptyPost);
    PostsCrud.createPost();
  }
  function editTitle() {
    // TODO: make work. prompt not supported by electron
    const newTitle = prompt("what's the new title??");
    const newPost = currentPost;
    newPost.title = newTitle || 'new post';
    setCurrentPost(newPost);
  }

  function savePost() {
    PostsCrud.updatePost(currentPost);
  }
  function deletePost() {
    PostsCrud.deletePosts(currentPost);
  }

  return (
    <>
      <Button variant="primary" onClick={createPost}>
        new post
      </Button>
      <h2>{currentPost?.title || 'new post'}</h2>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={editTitle}>
          edit title
        </Button>
        <Button variant="secondary" onClick={savePost}>
          save
        </Button>
        <Button variant="secondary" onClick={deletePost}>
          delete
        </Button>
      </ButtonGroup>
    </>
  );
};

export default MetaEditor;
