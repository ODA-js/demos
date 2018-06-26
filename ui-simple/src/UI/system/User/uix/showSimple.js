import React from "react";
import PropTypes from 'prop-types';
import {
  
  SimpleShowLayout,
  
  Show,
  TextField,
  BooleanField,
  ArrayField,
  ReferenceManyField,
} from "react-admin";



const ShowRecordView = (props, context) => {
  const { uix } = context;
  const { Title } = uix['system/User'];
  const ToDoItem = uix['system/ToDoItem'];
  const File = uix['system/File'];

  return (
    <Show title={<Title />} {...props}>
      
      <SimpleShowLayout>
          
          <TextField 
            label="resources.User.fields.userName" 
            source="userName"
          />
          
          <BooleanField 
            label="resources.User.fields.isAdmin" 
            source="isAdmin"
            allowEmpty
          />
          
          <BooleanField 
            label="resources.User.fields.isSystem" 
            source="isSystem"
            allowEmpty
          />
          
          <BooleanField 
            label="resources.User.fields.enabled" 
            source="enabled"
            allowEmpty
          />
          
          <ArrayField addLabel={false} source="todosValues" >
            <ToDoItem.Grid />
          </ArrayField>
          
          
          <ReferenceManyField 
            addLabel={false}
            reference="system/File"
            target="user"
            source="id"
            allowEmpty
          >
            <File.Grid />
          </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

ShowRecordView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowRecordView;
