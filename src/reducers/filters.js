import {
    SORT_BY
} from '../actions/types';

const filtersReducerDefaultState = {
    text: '',
    sortBy: '',
    startYear: undefined,
    endYear: undefined
};
export default function (state = filtersReducerDefaultState, action) {
    switch (action.type) {
        // case 'FILTER_TEXT':
        //     return {
        //         ...state,
        //         text: action.text
        //     };
        // case 'START_YEAR':
        //     return {
        //         ...state,
        //         startYear: action.startYear
        //     };
        // case 'END_YEAR':
        //     return {
        //         ...state,
        //         endYear: action.endYear
        //     };
        case 'SORT_BY':
            console.log('usersssssssssssssssssssssssssssssssssssssssssssssss');
            return {
                ...state,
                sortBy: action.sortType
            };
        // case 'CLEAR':
        //     return {
        //         ...state,
        //         text: action.defaultFilter.text,
        //         sortBy: action.defaultFilter.sortBy,
        //         startYear: action.defaultFilter.startYear,
        //         endYear: action.defaultFilter.endYear
        //     };
        default:
            return state;
    }
}
