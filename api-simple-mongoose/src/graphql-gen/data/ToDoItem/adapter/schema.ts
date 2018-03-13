import * as mongoose from 'mongoose';

export default () => {
  let $ToDoItem = new mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
    },
    dueToDate: {
      type: Date,
    },
    user: {
      type: String,
    },
  }, {
    collection: 'todoitems',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $ToDoItem.index({
    name: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    description: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    done: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    dueToDate: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    user: 1,
  }, {
    sparse: 1,
  });

  return $ToDoItem;
};
