import React from "react";
import PropTypes from 'prop-types';
import {
    Filter,

} from "react-admin";


const FilterPanel = (props, {translate}) => (
  <Filter {...props} >
  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default FilterPanel;
