import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { signIn } from './auth';

import { TeamTypes } from '../ducks/teams';
import { getTeams } from './teams';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(TeamTypes.GET_TEAMS_REQUEST, getTeams),
  ]);
}
