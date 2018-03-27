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
    published: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    removed: {
      type: Boolean,
    },
    owner: {
      type: String,
    },
    user: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
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
    published: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    user: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    id: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $ToDoItem.index({
    createdBy: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    updateBy: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    createdAt: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    updatedAt: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    removed: 1,
  }, {
    sparse: 1,
  });

  $ToDoItem.index({
    owner: 1,
  }, {
    sparse: 1,
  });

  return $ToDoItem;
};
