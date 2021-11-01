import ObjectID from 'bson-objectid';

interface NoteInDb {
  _id: ObjectID;
  title: string;
  body?: string;
  partitionValue: string;
}

export default NoteInDb;
