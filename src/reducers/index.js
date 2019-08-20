import { combineReducers } from 'redux';
import gitHubReducer from './gitHubReducer';
// import filtersReducer from './filters';

const rootReducer = combineReducers({
  gitHub: gitHubReducer
  // filters: filtersReducer,
});

export default rootReducer;
