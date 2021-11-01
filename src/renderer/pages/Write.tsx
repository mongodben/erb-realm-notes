import React from 'react';
import { PageLayout, Editor, Posts, MetaEditor } from '../components';
// TODO: refactor to pull real data
import dummyPosts from '../data-access/sample-posts';

const Write: React.FC = () => {

  return (
    <PageLayout>
      <MetaEditor />
      <Editor />
      <Posts posts={dummyPosts} />
    </PageLayout>
  );
};

export default Write;
