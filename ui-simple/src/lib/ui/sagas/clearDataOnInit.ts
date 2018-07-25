import { change, formValueSelector, initialize } from 'redux-form';
import { put, select, take, TakeEffect, PutEffect, SelectEffect } from 'redux-saga/effects';

import { SELECTOR_CLEAR } from './../consts';

export default function ({ form }) {
  return function* () {
    console.log('SELECTOR_CLEAR');
    yield take(SELECTOR_CLEAR);
    yield put(initialize(form, {}, false, {
      keepDirty: false,
      keepSubmitSucceeded: false,
      updateUnregisteredFields: true,
      keepValues: false
    }));
  }
}