import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '../../store/ducks/projects';
import MembersActions from '../../store/ducks/members';

import Modal from '../Modal';
import Button from '../../styles/components/Button';
import { Container, Project } from './styles';
import Members from '../Members';

class Projects extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.number,
      })),
    }).isRequired,
    members: PropTypes.shape({
      membersModalOpen: PropTypes.bool,
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
      openMembersModal,
      members,
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
            <Button onClick={openMembersModal}>Membros</Button>
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

        { members.membersModalOpen && <Members /> }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,

  members: state.members,
});

const mapDispatchToProsp = dispatch => bindActionCreators({
  ...ProjectsActions,
  ...MembersActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProsp)(Projects);
