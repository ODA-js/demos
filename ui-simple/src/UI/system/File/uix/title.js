import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ record }, { translate }) => (
  <span>
    {translate('resources.File.listName', { smart_count: 1 })}{' '}
    {record ? `"${record.path}"` : ''}
  </span>
);

Title.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default Title;
