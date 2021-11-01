import RealmWrapper from 'types/RealmWrapper';
import { Post } from 'types/posts';

function getPosts(_: Realm.App, realm: RealmWrapper, __: Post[]) {
  if (!realm.isOpen) {
    throw new Error("Realm isn't open");
  }
  const { db } = realm;
  const dbNotes = db?.objects('Note') || [];
  console.log('num notes in the database is', dbNotes.length);
  console.log('array from db notes', Array.from(dbNotes));
  const posts = Array.from(dbNotes).map((note) => {
    const noteJsObj = JSON.parse(JSON.stringify(note));
    // eslint-disable-next-line no-underscore-dangle
    noteJsObj.uid = noteJsObj._id;
    delete noteJsObj.myPartition;
    return noteJsObj;
  });
  console.log('POJO posts are', posts);
  return posts;
}

export default getPosts;
