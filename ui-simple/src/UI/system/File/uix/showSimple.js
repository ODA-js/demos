import React from "react";
import PropTypes from 'prop-types';
import {
  
  SimpleShowLayout,
  
  Show,
  TextField,
  ReferenceField,
} from "react-admin";



const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/File'];
  return (
    <Show title={<Title />} {...props}>
      
      <SimpleShowLayout>
          
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
      </SimpleShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowRecordView;
