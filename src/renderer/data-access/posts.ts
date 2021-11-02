import { Post } from 'types/posts';
import { ipcRendererHandler } from 'renderer/ipc';

class PostsCrud {
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
      const res = await ipcRendererHandler('updatePost', post);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deletePosts(postIds: string[]): Promise<boolean | null> {
    try {
      const res = await ipcRendererHandler('deletePosts', postIds);
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
