import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { PostsCrud } from 'renderer/data-access';
import Context from 'renderer/Context';
import { Post } from 'types/posts';
import ObjectID from 'bson-objectid';
import { FaCheck } from 'react-icons/fa'

type TitleFormProps = {
  editTitleStateChangeHandle: (newState: boolean) => void;
};

const TitleForm: React.FC<TitleFormProps> = ({
  editTitleStateChangeHandle,
}: TitleFormProps) => {
  const { currentPost, setCurrentPost } = useContext(Context);

  function handleChange(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const newTitle = e.target.value;
    const newCurrentPost = { ...currentPost };
    newCurrentPost.title = newTitle;
    setCurrentPost(newCurrentPost);
  }

  function handleEditingTitle(e: React.ChangeEvent<any>) {
    e.preventDefault();
    editTitleStateChangeHandle(false);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>enter title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={currentPost.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleEditingTitle}>
        <FaCheck />
      </Button>
    </Form>
  );
};

const MetaEditor: React.FC = () => {
  const { currentPost, setCurrentPost, causeRefresh } = useContext(Context);

  const [editingTitle, setEditingTitle] = useState(false);

  function createPost() {
    const emptyPost: Post = {
      uid: new ObjectID().id,
      title: 'new post',
      body: '# my new post',
    };
    setCurrentPost(emptyPost);
    PostsCrud.createPost();
  }
  function editTitle() {
    setEditingTitle(true);
  }

  function savePost() {
    PostsCrud.updatePost(currentPost);
    causeRefresh();
    alert(`saved your post: ${currentPost.title}`);
  }
  function deletePost() {
    PostsCrud.deletePosts(currentPost);
  }

  return (
    <>
      <Button variant="primary" onClick={createPost}>
        new post
      </Button>

      {editingTitle ? (
        <TitleForm editTitleStateChangeHandle={setEditingTitle} />
      ) : (
        <h2>{currentPost?.title || 'new post'}</h2>
      )}

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
