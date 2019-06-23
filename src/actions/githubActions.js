import axios from 'axios';

import {
    GET_USERS,
    USERS_LOADING
} from './types';

// Profile loading
export const setProfileLoading = () => {
    return {
        type: USERS_LOADING
    };
};

// Get profile by handle
export const searchProfile = handle => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`https://api.github.com/search/users?q=${handle}`)
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data.items
            })
        )
        .catch(err =>
            dispatch({
                type: GET_USERS,
                payload: null
            })
        );
};
