import React, { useState } from 'react';
import { PageLayout, Editor, Posts } from '../components';

const dummyPosts = [
  {
    uid: '1',
    title: 'my first post',
  },
  {
    uid: '2',
    title: 'my second post',
  },
  {
    uid: '1',
    title: 'my third post',
  },
];

const Write: React.FC = () => {
  const [currPost, setcurrPost] = useState<string | undefined>(
    '**Hello world!!!**'
  );
  const [currPostId, setCurrPostId] = useState<string | undefined>('');

  return (
    <PageLayout>
      <Editor md={currPost} setMd={setcurrPost} title="New Page" />
      <Posts posts={dummyPosts} setPostId={setCurrPostId} />
    </PageLayout>
  );
};

export default Write;
