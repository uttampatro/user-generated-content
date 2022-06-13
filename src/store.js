import { combineReducers, createStore } from 'redux';
import authReducer from './reducer/authReducer';
import articlesReducer from './reducer/articlesReducer';
import viewArticleReducer from './reducer/viewArticleReducer';
import userArticlesReducer from './reducer/userArticlesReducer';
import createArticleReducer from './reducer/createArticleReducer';

export default () => {
    return createStore(
        combineReducers({
            authState: authReducer,
            articlesReducer,
            viewArticleReducer,
            userArticlesReducer,
            createArticleReducer,
        })
    );
};
