import axios from 'axios';

import {
    GET_USERS,
    USERS_LOADING,
    SET_USERS
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
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data.items
            })
            return res;
        }).then(res => {
            // dispatch({
            //     type: SET_USERS,
            //     payload: res.data.items
            // })
            // dispatch(setUsers(res.data.items));
            return res;
        })
        .catch(err => {
                dispatch({
                    type: GET_USERS,
                    payload: null
                })
            }
        );
};
// Set logged in user
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}
