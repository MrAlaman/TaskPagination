import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import * as fromUsers from '../apis/users';

const PAGE_SIZE = 5;

export const getUsersRequested = state => state.users.requested;

export const getUsersErrored = state => state.users.errored;

export const getUser = (state, id) => state.users.byId[id];

const getUsersById = state => state.users.byId;

const getUsersIds = state => state.users.ids;

export const getUsers = createSelector(
  [getUsersById, getUsersIds],
  (pById, pIds) => pIds.map(o => pById[o]),
);

export const getUsersCurrentPage = state => state.users.currentPage;

export const getUsersLastPage = state => state.users.lastPage;

const getIsPageFetched = (state, page) => state.users.pages[page] !== undefined;

const getUsersIdsPaged = (state) => {
  const page = state.users.currentPage;
  const pageIds = state.users.pages[page];
  if (pageIds === undefined) {
    return [];
  }
  return pageIds;
};

export const getUsersPaged = createSelector(
  [getUsersById, getUsersIdsPaged],
  (pById, pIds) => pIds.map(o => pById[o]),
);

// ACTIONS
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';

const FETCH_USERS_RESPONSE = 'FETCH_USERS_RESPONSE';

const SET_USERS_CURRENT_PAGE = 'SET_USERS_CURRENT_PAGE';

const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersResponse = (payload, error) => {
  if (error) {
    return {
      error: true,
      payload,
      type: FETCH_USERS_RESPONSE,
    };
  }
  return {
    payload,
    type: FETCH_USERS_RESPONSE,
  };
};

const setUsersCurrentPage = page => ({
  payload: page,
  type: SET_USERS_CURRENT_PAGE,
});

export const fetchUsers = page => (dispatch, getState) => {
  const state = getState();
  const offset = page * PAGE_SIZE;
  dispatch(setUsersCurrentPage(page));
  if (getIsPageFetched(state, page)) {
    return;
  }
  dispatch(fetchUsersRequest());
  fromUsers.fetchUsers({
    limit: PAGE_SIZE,
    offset,
  })
    .then((response) => {
      const pageCount = Math.ceil(response.count / PAGE_SIZE);
      dispatch(fetchUsersResponse({
        users: response.results,
        page,
        pageCount,
      }));
    })
    .catch(() => dispatch(fetchUsersResponse('500', true)));
};

// REDUCER
const requested = (state = false, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return true;
    case FETCH_USERS_RESPONSE:
      return false;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  const entry = {}; // OUTSIDE BECAUSE OF LINTER
  switch (action.type) {
    case FETCH_USERS_RESPONSE:
      if (action.error) {
        return state;
      }
      for (let i = 0; i < action.payload.users.length; i += 1) {
        const user = action.payload.users[i];
        entry[user.id] = user;
      }
      return {
        ...state,
        ...entry,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_RESPONSE:
      if (action.error) {
        return state;
      }
      return [
        ...state,
        ...action.payload.users.map(o => o.id),
      ];
    default:
      return state;
  }
};

const errored = (state = false, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return false;
    case FETCH_USERS_RESPONSE:
      return action.error === true;
    default:
      return state;
  }
};

const currentPage = (state = 0, action) => {
  switch (action.type) {
    case SET_USERS_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};

const lastPage = (state = 0, action) => {
  switch (action.type) {
    case FETCH_USERS_RESPONSE:
      if (action.error) {
        return state;
      }
      return action.payload.pageCount - 1;
    default:
      return state;
  }
};

const pages = (state = {}, action) => {
  let pageIds;
  switch (action.type) {
    case FETCH_USERS_RESPONSE:
      if (action.error) {
        return state;
      }
      pageIds = action.payload.users.map(user => user.id);
      return {
        ...state,
        [action.payload.page]: pageIds,
      };
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  currentPage,
  errored,
  ids,
  lastPage,
  pages,
  requested,
});
