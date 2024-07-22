// userActions.js
export const FETCH_REGISTERED_USERS_COUNT_REQUEST = 'FETCH_REGISTERED_USERS_COUNT_REQUEST';
export const FETCH_REGISTERED_USERS_COUNT_SUCCESS = 'FETCH_REGISTERED_USERS_COUNT_SUCCESS';
export const FETCH_REGISTERED_USERS_COUNT_FAILURE = 'FETCH_REGISTERED_USERS_COUNT_FAILURE';

export const fetchRegisteredUsersCount = (token) => async (dispatch) => {
  dispatch({ type: FETCH_REGISTERED_USERS_COUNT_REQUEST });

  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/users/count', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch registered users count');
    }

    const data = await response.json();

    dispatch({
      type: FETCH_REGISTERED_USERS_COUNT_SUCCESS,
      payload: data.count // Assuming your API returns an object with 'count' property
    });
  } catch (error) {
    dispatch({
      type: FETCH_REGISTERED_USERS_COUNT_FAILURE,
      error: error.message
    });
  }
};
