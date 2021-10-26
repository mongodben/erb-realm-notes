const Note = {
  name: 'Note',
  properties: {
    _id: 'objectId',
    myPartition: 'string', // the logged in user's ID
    title: 'string',
    body: 'string?',
  },
  primaryKey: '_id',
};

// eslint-disable-next-line import/prefer-default-export
export { Note };
