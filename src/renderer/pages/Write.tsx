import React, { useEffect, useState } from 'react';
import { PostsCrud } from 'renderer/data-access';
import { Post } from 'types/posts';
import { PageLayout, Editor, Posts, MetaEditor } from '../components';
// TODO: refactor to pull real data

const Write: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async function() {
      const dbPosts = await PostsCrud.getAllPosts();
      setPosts(dbPosts || []);

    }
    )();
  }, []);

  return (
    <PageLayout>
      <MetaEditor />
      <Editor />
      <Posts posts={posts} />
    </PageLayout>
  );
};

export default Write;
