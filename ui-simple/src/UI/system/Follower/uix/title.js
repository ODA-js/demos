import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ record }, { translate }) => (
  <span>
    {translate('resources.Follower.listName', { smart_count: 1 })}{' '}
    {record ? `"${record.id}"` : ''}
  </span>
);

Title.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default Title;
