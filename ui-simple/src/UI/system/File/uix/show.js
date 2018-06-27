import React from "react";
import PropTypes from 'prop-types';
import {
  
  TabbedShowLayout,
  Tab,
  
  Show,
  TextField,
  ReferenceField,
} from "react-admin";

const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/File'];
  return (
    <Show title={<Title />} {...props}>
      
      
      <TabbedShowLayout>
        <Tab label="resources.File.summary">
          <TextField 
            label="resources.File.fields.path" 
            source="path"
          />
          <TextField 
            label="resources.File.fields.filename" 
            source="filename"
            allowEmpty
          />
          <TextField 
            label="resources.File.fields.mimetype" 
            source="mimetype"
            allowEmpty
          />
          <TextField 
            label="resources.File.fields.encoding" 
            source="encoding"
            allowEmpty
          />
        </Tab>
        <Tab label="resources.File.fields.user">
          <ReferenceField 
            addLabel={false} 
            source="userId" 
            reference="system/User"
            allowEmpty
            linkType="show"
          >
            <TextField 
              source="userName"
              allowEmpty 
            />
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowRecordView;
