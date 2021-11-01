import RealmWrapper from 'types/RealmWrapper';

function deleteNotes(_: Realm.App, realm: RealmWrapper, noteIds: string[]) {
  if (realm.isOpen) {
    const { db } = realm;
    db?.write(() => {
      noteIds.forEach((id) => {
        const note = db.objects('Note').filtered(`_id == ${id} `);
        db.delete(note);
      });
    });
  } else {
    throw new Error("Realm isn't open");
  }
}

export default deleteNotes;
