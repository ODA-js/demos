import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import { consts } from 'oda-ra-ui';
const actionType = consts.actionType;

const CreateForm = (props, context) => {
  const { Form, Title } = context.uix['system/Follower'];
  const { translate } = context;

  return (
    <Create title={<Title />} {...props}>
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
    </Create>
  );
};

CreateForm.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default CreateForm;