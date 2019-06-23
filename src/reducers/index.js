import { combineReducers } from 'redux';
import gitHubReducer from './gitHubReducer';

const rootReducer = combineReducers({
  gitHub: gitHubReducer,
});

export default rootReducer;
