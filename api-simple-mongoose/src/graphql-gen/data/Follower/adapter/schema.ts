import * as mongoose from 'mongoose';

export default () => {
  let $Follower = new mongoose.Schema({
    follower: {
      type: String,
    },
    following: {
      type: String,
    },
  }, {
    collection: 'followers',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Follower.index({
    follower: 1,
  }, {
    sparse: 1,
  });

  $Follower.index({
    following: 1,
  }, {
    sparse: 1,
  });

  return $Follower;
};
