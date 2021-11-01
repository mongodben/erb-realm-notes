interface Post {
  uid: string;
  title: string;
  body?: string;
}

type PostsProps = {
  posts: PostMeta[];
};

type PostMeta = {
  title: string;
  uid: string;
};

type PostMetaWithSetter = {
  meta: PostMeta;
  setter: (val: string) => void;
};

export { Post, PostMeta, PostsProps, PostMetaWithSetter };
