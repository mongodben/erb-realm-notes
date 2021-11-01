import RealmWrapper from 'types/RealmWrapper';
import ObjectID from 'bson-objectid';
import { Post } from 'types/posts';
import NoteInDb from 'types/NoteInDb';

function createNotes(app: Realm.App, realm: RealmWrapper, notes: Post[]) {
  if (realm.isOpen) {
    const { db } = realm;

    try {
      db?.write(() => {
        notes.forEach((note) => {
          const dbNote: NoteInDb = {
            _id: new ObjectID(),
            title: note.title,
            body: note.body,
            partitionValue: app.currentUser?.id || '',
          };
          db.create('Note', dbNote);
        });
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  } else {
    throw new Error("Realm isn't open");
    return false;
  }
}

export default createNotes;
