import { useState, useEffect } from 'react';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import '../App.global.css';
import { getPostById } from 'renderer/data-access';

interface Post {
  uid: string;
  title: string;
  body?: string;
}

type Props = {
  uid: string | undefined;
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Editor: React.FC<Props> = ({ uid = '' }) => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const [currPost, setCurrPost] = useState<Post | undefined>(getPostById(uid));

  useEffect(() => {
    const post = getPostById(uid);
    setCurrPost(post);
  }, [uid]);

  function updatePost(currentBody: string): void {
    const newPost = currPost;
    if (newPost) {
      newPost.body = currentBody;
    }
    setCurrPost(newPost);
  }

  return (
    <>
      <h2>{currPost?.title || 'New Post'}</h2>
      <ReactMde
        value={currPost?.body || 'Hello World!'}
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
