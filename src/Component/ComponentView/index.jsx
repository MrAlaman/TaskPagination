import { PropTypes } from 'prop-types';
import React from 'react';
import './styles.css';

const ComponentView = ({ usersCurrentPage, usersLastPage, usersPaged, onNext, onPrevious }) => (
  <div>
    <table>
    <tbody>
    <tr>
      <th>Name</th>
      <th>Surname</th>
      <th>Description</th>
    </tr>
      {usersPaged.map(users => <tr key={users.id}><td>{users.name}</td><td>{users.surname}</td><td>{users.desc}</td></tr>)}
    </tbody>
    </table>
    {usersCurrentPage !== 0 && <button onClick={onPrevious} className="button">Previous</button>}
    {usersCurrentPage !== usersLastPage && <button onClick={onNext} className="button">Next</button>}
  </div>
);
ComponentView.propTypes = {
  usersCurrentPage: PropTypes.number.isRequired,
  usersLastPage: PropTypes.number.isRequired,
  usersPaged: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
export default ComponentView;
