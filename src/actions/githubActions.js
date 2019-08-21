import axios from 'axios';
import isEmpty from '../validation/is-empty'
import {
    GET_USERS,
    USERS_LOADING,
    SET_USERS,
    SORT_BY
} from './types';

// Profile loading
export const setProfileLoading = () => {
    return {
        type: USERS_LOADING
    };
};

export const sortBy = (users)  => {
    console.log('sortBy github actions');
    return {
        type: SORT_BY,
        payload: users
    };
};

// Get profile by handle
export const searchProfile = (handle, per_page) => dispatch => {
    const clientId = require('../config/gitHub').clientId;
    const clientSecret = require('../config/gitHub').clientSecret;
    if(isEmpty(per_page))
        per_page = 5;
    const sort = 'created: asc';

    dispatch(setProfileLoading());
    axios
        .get(`https://api.github.com/search/users?q=${handle}&client_id=${clientId}&client_secret=${clientSecret}&sort=${sort}&per_page=${per_page}`)
        .then(res => {
            dispatch(setUsers(res.data.items));
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
