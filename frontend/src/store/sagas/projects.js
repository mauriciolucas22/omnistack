import { call, put } from 'redux-saga/effects';
import { reducer as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* createProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title });

    yield put(ProjectsActions.createprojectSuccess(response.data));
    yield put(ProjectsActions.openProjectModal());
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Não foi possível criar projeto',
    }));
  }
}
