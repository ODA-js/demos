import * as mongoose from 'mongoose';

export default () => {
  let $ToDoItem = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      done: {
        type: Boolean,
      },
      location: {
        type: mongoose.Schema.Types.Mixed,
      },
      dueToDate: {
        type: Date,
      },
      published: {
        type: Boolean,
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
      },
      updatedAt: {
        type: Date,
      },
      user: {
        type: String,
      },
    },
    {
      collection: 'todoitems',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $ToDoItem.index(
    {
      name: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      description: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      done: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      location: '2dsphere',
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      dueToDate: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      published: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      user: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      id: 1,
    },
    {
      sparse: 1,
      unique: 1,
    },
  );

  $ToDoItem.index(
    {
      updatedBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $ToDoItem.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  return $ToDoItem;
};
