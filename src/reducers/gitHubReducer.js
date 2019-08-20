import {
    GET_USERS,
    USERS_LOADING,
    SET_USERS, SORT_BY
} from '../actions/types';

const initialState = {
    users: null,
    loading: false
};

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case SORT_BY:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
