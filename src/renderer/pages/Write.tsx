import React, { useState } from 'react';
import { PageLayout, Editor, Posts } from '../components';
// TODO: refactor to pull real data
import dummyPosts from '../data-access/sample-posts';


const Write: React.FC = () => {
  const [currPostId, setCurrPostId] = useState<string | undefined>(undefined);

  function setPostId(id: string): void {
    setCurrPostId(id);
  }

  return (
    <PageLayout>
      <Editor uid={currPostId} />
      <Posts posts={dummyPosts} setPostId={setPostId} />
    </PageLayout>
  );
};

export default Write;
