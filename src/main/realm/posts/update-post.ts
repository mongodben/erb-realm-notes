import RealmWrapper from 'types/RealmWrapper';
import Note from 'types/Note';

function updateNoteById(_: Realm.App, realm: RealmWrapper, notes: Note[]) {
  if (realm.isOpen) {
    const { db } = realm;
    const note = notes[0];
    try {
      db?.write(() => {
        const noteInDb: any = db.objects('Note').filtered(`_id == ${note.id}`);
        noteInDb.title = note.title;
        noteInDb.body = note.body;
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

export default updateNoteById;
