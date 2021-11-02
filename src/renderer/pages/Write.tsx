import React, { useEffect, useState, useContext } from 'react';
import { PostsCrud } from 'renderer/data-access';
import { Post } from 'types/posts';
import { PageLayout, Editor, Posts, MetaEditor } from '../components';
import Context from '../Context';
// TODO: refactor to pull real data

const Write: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { refresh } = useContext(Context);

  useEffect(() => {
    (async function() {
      const dbPosts = await PostsCrud.getAllPosts();
      console.log('db posts are', dbPosts)
      setPosts(dbPosts || []);

    }
    )();
  }, [refresh]);

  return (
    <PageLayout>
      <MetaEditor />
      <Editor />
      <Posts posts={posts} />
    </PageLayout>
  );
};

export default Write;
