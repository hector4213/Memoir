import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import profile from './reducers/profile';
import page from './reducers/page';

const store = createStore(combineReducers({
    profile,
    page,
}), applyMiddleware(thunk));

export default store;