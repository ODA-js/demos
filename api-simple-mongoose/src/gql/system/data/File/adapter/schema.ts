import * as mongoose from 'mongoose';

export default () => {
  let $File = new mongoose.Schema(
    {
      path: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
      },
      mimetype: {
        type: String,
      },
      encoding: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    {
      collection: 'files',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $File.index(
    {
      path: 1,
    },
    {
      sparse: 1,
      unique: 1,
    },
  );

  $File.index(
    {
      filename: 1,
    },
    {
      sparse: 1,
    },
  );

  $File.index(
    {
      mimetype: 1,
    },
    {
      sparse: 1,
    },
  );

  $File.index(
    {
      encoding: 1,
    },
    {
      sparse: 1,
    },
  );

  $File.index(
    {
      user: 1,
    },
    {
      sparse: 1,
    },
  );

  return $File;
};
