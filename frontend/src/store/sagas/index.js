import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { signIn, signOut } from './auth';

import { TeamTypes } from '../ducks/teams';
import { getTeams, createTeam } from './teams';

import { ProjectsTypes } from '../ducks/projects';
import { getProjects } from './projects';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),

    takeLatest(TeamTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(TeamTypes.CREATE_TEAM_REQUEST, createTeam),

    takeLatest(TeamTypes.SELECT_TEAM, getProjects), // ao selecionar time busca projetos
    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
  ]);
}
