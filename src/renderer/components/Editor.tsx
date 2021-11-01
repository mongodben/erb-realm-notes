import { useState, useEffect, useContext } from 'react';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import '../App.global.css';
import { getPostById } from 'renderer/data-access';
import { Post } from 'types/posts';
import Context from '../Context';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor: React.FC = () => {
  const { currentPost, setCurrentPost } = useContext(Context);

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const [localPost, setLocalPost] = useState<Post>(
    getPostById(currentPost.uid)
  );

  useEffect(() => {
    const post = getPostById(currentPost.uid);
    setLocalPost(post);
  }, [currentPost?.uid]);

  function updatePost(currentBody: string): void {
    const newPost = localPost;
    newPost.body = currentBody;
    setLocalPost(newPost);
    setCurrentPost(newPost);
  }

  return (
    <>
      <ReactMde
        value={localPost?.body || 'Hello World!'}
        onChange={(curr) => updatePost(curr)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </>
  );
};

export default Editor;
