import { change, formValueSelector } from 'redux-form';
import { put, select, take, TakeEffect, PutEffect, SelectEffect } from 'redux-saga/effects';

import { FORM_EMBED_RELATION } from './../consts';

export default function ({ form }) {
  return function* () {
    while (true) {
      const action = yield take(FORM_EMBED_RELATION);
      debugger;
      const state = yield select();
      debugger;
      const selector = formValueSelector(form);
      debugger;
      const rel = action.payload.relname;
      debugger;
      const relId = rel + 'Id';
      debugger;
      yield put(change(form, rel, null));
      debugger;
      yield put(change(form, relId, selector(state, relId)));
    }
  }
}