import React from 'react';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import { translate } from 'react-admin';

export default {
  'system/User': {
    icon: <ListIcon />,
    visible: true,
    name: translate('resources.User.name', { smart_count: 2 }),
  },
  'system/ToDoItem': {
    icon: <ListIcon />,
    visible: true,
    name: translate('resources.ToDoItem.name', { smart_count: 2 }),
  },
  'system/File': {
    icon: <ListIcon />,
    visible: true,
    name: translate('resources.File.name', { smart_count: 2 }),
  },
  'system/Follower': {
    icon: <ListIcon />,
    visible: true,
    name: translate('resources.Follower.name', { smart_count: 2 }),
  },
};
