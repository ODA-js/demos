import React from "react";
import PropTypes from 'prop-types';
import {
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  BooleanInput,
  NullableBooleanInput,
  Filter,
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';

const FilterPanel = (props, {translate}) => (
  <Filter {...props} >
    <TextInput label="uix.filter.search" source="q" allowEmpty alwaysOn />

    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.ToDoItem.fields.name')})} source="name-exists" />

    <TextInput label={translate("uix.filter.imatch",{ name: translate('resources.ToDoItem.fields.name')})} source="name-imatch" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.in",{ name: translate('resources.ToDoItem.fields.name')})} source="name-in" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.nin",{ name: translate('resources.ToDoItem.fields.name')})} source="name-nin" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.ToDoItem.fields.description')})} source="description-exists" />

    <TextInput label={translate("uix.filter.imatch",{ name: translate('resources.ToDoItem.fields.description')})} source="description-imatch" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.in",{ name: translate('resources.ToDoItem.fields.description')})} source="description-in" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.nin",{ name: translate('resources.ToDoItem.fields.description')})} source="description-nin" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.ToDoItem.fields.done')})} source="done-exists" />

    <BooleanInput label={translate("uix.filter.eq",{ name: translate('resources.ToDoItem.fields.done')})} source="done-eq" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.ToDoItem.fields.dueToDate')})} source="dueToDate-exists" />

    <DateInput label={translate("uix.filter.lte",{ name: translate('resources.ToDoItem.fields.dueToDate')})} source="dueToDate-lte" allowEmpty />
    <DateInput label={translate("uix.filter.gte",{ name: translate('resources.ToDoItem.fields.dueToDate')})} source="dueToDate-gte" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.ToDoItem.fields.published')})} source="published-exists" />

    <BooleanInput label={translate("uix.filter.eq",{ name: translate('resources.ToDoItem.fields.published')})} source="published-eq" allowEmpty />

  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default FilterPanel;
