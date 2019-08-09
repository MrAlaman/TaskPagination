import { connect } from 'react-redux';
import * as fromUsers from '../ducks/users';
import ComponentControl from './ComponentControl';

const mapStateToProps = state => ({
  usersCurrentPage: fromUsers.getUsersCurrentPage(state),
  usersErrored: fromUsers.getUsersErrored(state),
  usersLastPage: fromUsers.getUsersLastPage(state),
  usersPaged: fromUsers.getUsersPaged(state),
  usersRequested: fromUsers.getUsersRequested(state),
});

const mapDispatchToProps = {
  fetchUsers: fromUsers.fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentControl);
