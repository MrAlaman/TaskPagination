import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ComponentView from './ComponentView';

export default class ComponentControl extends Component {
  componentDidMount() {
    const { fetchUsers, usersCurrentPage } = this.props;
    fetchUsers(usersCurrentPage);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }
  handleNext() {
    const { fetchUsers, usersCurrentPage } = this.props;
    fetchUsers(usersCurrentPage + 1);
  }
  handlePrevious() {
    const { fetchUsers, usersCurrentPage } = this.props;
    fetchUsers(usersCurrentPage - 1);
  }
  render() {
    const {
      usersPaged,
      usersCurrentPage,
      usersErrored,
      usersLastPage,
      usersRequested,
    } = this.props;
    if (usersRequested) return <div>Requested</div>;
    if (usersErrored) return <div>Errored</div>;
    return (
      <ComponentView
        onNext={this.handleNext}
        onPrevious={this.handlePrevious}
        usersPaged={usersPaged}
        usersCurrentPage={usersCurrentPage}
        usersLastPage={usersLastPage}
      />
    );
  }
}
ComponentControl.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  usersPaged: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  usersCurrentPage: PropTypes.number.isRequired,
  usersErrored: PropTypes.bool.isRequired,
  usersLastPage: PropTypes.number.isRequired,
  usersRequested: PropTypes.bool.isRequired,
};
