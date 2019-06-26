import {
    GET_USERS,
    USERS_LOADING,
    SET_USERS
} from '../actions/types';

const initialState = {
    users: null,
    loading: false
};

export default function (state = initialState, action) {
    // console.log('2222222');
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
        default:
            return state;
    }
}
