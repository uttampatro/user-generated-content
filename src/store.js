import { combineReducers, createStore } from 'redux';
import authReducer from './reducer/authReducer';
import articlesReducer from './reducer/articlesReducer';
import viewArticleReducer from './reducer/viewArticleReducer';



export default () => {
    return createStore(combineReducers({ authState: authReducer, articlesReducer, viewArticleReducer }));
};
