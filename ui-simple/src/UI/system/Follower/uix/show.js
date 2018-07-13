import React from 'react';
import PropTypes from 'prop-types';
import { TabbedShowLayout, Tab, Show, TextField } from 'react-admin';

const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/Follower'];
  return (
    <Show title={<Title />} {...props}>
      <TabbedShowLayout>
        <Tab label="resources.Follower.summary">
          <TextField
            label="resources.Follower.fields.follower"
            source="follower"
          />
          <TextField
            label="resources.Follower.fields.following"
            source="following"
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default ShowRecordView;
