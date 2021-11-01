import { useState, useEffect, useContext } from 'react';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import '../App.global.css';
import Context from '../Context';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor: React.FC = () => {
  const { currentPost, setCurrentPost } = useContext(Context);
  const currId = currentPost.uid;

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const [localPost, setLocalPost] = useState<string>(currentPost.body);

  useEffect(() => {
    console.log('entered useEffect');
    setLocalPost(currentPost.body);
  }, [currentPost.uid, currentPost.body, currId]);

  // function updatePost(currentBody: string): void {
  //   const newPost = { ...currentPost };
  //   newPost.body = currentBody;
  //   setCurrentPost(newPost);
  // }

  function handleChange(curr: string) {
    const newCurrentPost = { ...currentPost };
    newCurrentPost.body = curr;
    setCurrentPost(newCurrentPost);
  }

  return (
    <>
      <ReactMde
        value={localPost || 'Hello World!'}
        onChange={handleChange}
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
