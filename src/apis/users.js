import guys from './users.json'

const USERS = guys;
/* eslint-disable-next-line */
export const fetchUsers = (params) => {
  const createPromise = response => new Promise((resolve) => {
    window.setTimeout(() => resolve(response), 1000);
  });
  if (params === undefined) {
    const response = {
      count: USERS.users.length,
      results: USERS.users,
    };
    return createPromise(response);
  }
  const { limit } = params;
  const offset = params.offset !== undefined ? params.offset : 0;
  if (limit === undefined) {
    const response = {
      count: USERS.users.length,
      results: USERS.users.slice(offset),
    };
    return createPromise(response);
  }
  const defaultResponse = {
    count: USERS.users.length,
    results: USERS.users.slice(offset, offset + limit),
  };
  return createPromise(defaultResponse);
};
