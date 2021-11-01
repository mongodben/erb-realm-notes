import { Post } from 'types/posts';
import { ipcRendererHandler } from 'renderer/ipc';
import samplePosts from './sample-posts';

class PostsCrud {
  static async getPostById(uid: string): Promise<Post | undefined> {
    return samplePosts.find((el) => el.uid === uid);
  }

  static async createPost(): Promise<boolean | null> {
    const post: Post = {
      uid: '',
      title: 'New Post',
      body: 'Hello world',
    };

    try {
      const res = await ipcRendererHandler('createPost', post);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async updatePost(post: Post): Promise<boolean | null> {
    try {
      console.log('post is', post);
      const res = await ipcRendererHandler('updatePost', post);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deletePosts(posts: Post[]): Promise<boolean | null> {
    try {
      const res = await ipcRendererHandler('deletePosts', [posts]);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async getAllPosts(): Promise<Post[] | null> {
    try {
      const res = await ipcRendererHandler('getPosts');
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default PostsCrud;
