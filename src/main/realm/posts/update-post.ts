import RealmWrapper from 'types/RealmWrapper';
import { Post } from 'types/posts';
import ObjectID from 'bson-objectid';
import app from '../app';

function updateNoteById(_: Realm.App, realm: RealmWrapper, notes: Post[]) {
  if (realm.db === null) throw new Error('no open realm');

  if (realm.isOpen) {
    const { db } = realm;
    const note = notes[0];
    console.log('note is', note);

    if (note.uid.length !== 12) {
      const diff = 12 - note.uid.length;
      let rest = '';
      for (let i = 0; i < diff; i += 1) {
        rest += 'X';
      }
      note.uid += rest;
    }
    try {
      db?.write(() => {
        //  upsert note
        db.create(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'Note',
          {
            _id: new ObjectID(note.uid),
            title: note.title,
            body: note.body,
            myPartition: app.currentUser?.id,
          },
          'modified'
        );
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  } else {
    throw new Error("Realm isn't open");
  }
}

export default updateNoteById;
