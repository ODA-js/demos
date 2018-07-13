import React from 'react';
import PropTypes from 'prop-types';
import {
  Filter,
  TextInput,
  NullableBooleanInput,
  SelectArrayInput,
} from 'react-admin';

const FilterPanel = (props, { translate }) => (
  <Filter {...props}>
    <TextInput label="uix.filter.search" source="q" allowEmpty alwaysOn />

    <NullableBooleanInput
      label={translate('uix.filter.exists', {
        name: translate('resources.File.fields.path'),
      })}
      source="path-exists"
    />

    <TextInput
      label={translate('uix.filter.imatch', {
        name: translate('resources.File.fields.path'),
      })}
      source="path-imatch"
      allowEmpty
    />
    <SelectArrayInput
      label={translate('uix.filter.in', {
        name: translate('resources.File.fields.path'),
      })}
      source="path-in"
      allowEmpty
    />
    <SelectArrayInput
      label={translate('uix.filter.nin', {
        name: translate('resources.File.fields.path'),
      })}
      source="path-nin"
      allowEmpty
    />
  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default FilterPanel;
