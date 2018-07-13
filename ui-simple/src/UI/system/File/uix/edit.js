import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import { consts } from 'oda-ra-ui';
const actionType = consts.actionType;

const EditForm = (props, context) => {
  const { Form, Title } = context.uix['system/File'];
  const { translate } = context;

  return (
    <Edit title={<Title />} {...props}>
      <Form
        {...props}
        singleRelActions={[
          { id: actionType.CREATE, name: translate('uix.actionType.CREATE') },
          { id: actionType.UPDATE, name: translate('uix.actionType.UPDATE') },
          { id: actionType.CLONE, name: translate('uix.actionType.CLONE') },
          { id: actionType.USE, name: translate('uix.actionType.USE') },
          { id: actionType.UNLINK, name: translate('uix.actionType.UNLINK') },
        ]}
        manyRelActions={[
          { id: actionType.CREATE, name: translate('uix.actionType.CREATE') },
          { id: actionType.UPDATE, name: translate('uix.actionType.UPDATE') },
          { id: actionType.CLONE, name: translate('uix.actionType.CLONE') },
          { id: actionType.USE, name: translate('uix.actionType.USE') },
        ]}
      />
    </Edit>
  );
};

EditForm.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default EditForm;
