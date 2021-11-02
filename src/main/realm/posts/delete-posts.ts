import RealmWrapper from 'types/RealmWrapper';
import ObjectID from 'bson-objectid';

function deleteNotes(_: Realm.App, realm: RealmWrapper, args: any[]) {
  if (realm.isOpen) {
    const noteIds = args[0];
    const { db } = realm;
    db?.write(() => {
      noteIds.forEach((idStr: string) => {
        const idBson = new ObjectID(idStr);
        const note = db.objects('Note').filtered('_id == $0', idBson);
        db.delete(note);
      });
    });
  } else {
    throw new Error("Realm isn't open");
  }
}

export default deleteNotes;
