import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '../../store/ducks/projects';

import Modal from '../Modal';
import Button from '../../styles/components/Button';
import { Container, Project } from './styles';

class Projects extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.number,
      })),
    }).isRequired,
  };

  state = {
    newProject: '',
  }

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreateProject = (e) => {
    e.preventDefault();

    const { createProjectRequest } = this.props;
    const { newProject } = this.state;

    createProjectRequest(newProject);
  }

  render() {
    const {
      activeTeam,
      projects,
      openProjectModal,
      closeProjectModal,
    } = this.props;

    const {
      newProject,
    } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Button onClick={openProjectModal}>Novo projeto</Button>
            <Button onClick={() => {}}>Membros</Button>
          </div>
        </header>

        {
          projects.data && projects.data.map(project => (
            <Project key={project.id}>
              <p>{project.title}</p>
            </Project>
          ))
        }

        {
          projects.projectModalOpen && (
            <Modal>
              <h1>Criar projeto</h1>

              <form onSubmit={this.handleCreateProject}>
                <span>NOME</span>
                <input value={newProject} name="newProject" onChange={this.handleInputChange} />

                <Button size="big" type="submit">SALVAR</Button>
                <Button onClick={closeProjectModal} size="small" color="gray">CANCELAR</Button>
              </form>
            </Modal>
          )
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
});

const mapDispatchToProsp = dispatch => bindActionCreators({ ...ProjectsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProsp)(Projects);
