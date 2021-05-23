import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { auth, promise } from './reducers';


const store = createStore( combineReducers( {
  auth,
  promise,
} ), applyMiddleware( thunk ) )

window.store = store  // DEBUG: for test only

export default store