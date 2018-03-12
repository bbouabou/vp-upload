import { createStore, combineReducers, applyMiddleware } from 'redux'

import { count } from './count'
import { random } from './random'
import { upload } from './upload'
import reduxThunk from 'redux-thunk'

const reducer = combineReducers({
  count,
  random,
  upload
});

export const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk));

// console.log(store.getState());
//
//
store.subscribe(()=> {console.log(store.getState())});