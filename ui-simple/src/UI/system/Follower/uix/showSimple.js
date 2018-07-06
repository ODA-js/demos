import React from "react";
import PropTypes from 'prop-types';
import {
  
  SimpleShowLayout,
  
  Show,
  TextField,
} from "react-admin";

const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/Follower'];
  return (
    <Show title={<Title />} {...props}>
      <SimpleShowLayout>
        <TextField 
          label="resources.Follower.fields.follower" 
          source="follower"
        />
        <TextField 
          label="resources.Follower.fields.following" 
          source="following"
        />
      </SimpleShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowRecordView;
