const initialState = {
    articles: [],
    randomArticles: [],
};

function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case 'GETTING_ALL_ARTICLES':
            return {
                ...state,
                articles: action.value,
            };
        case 'GETTING_RANDOM_ARTICLES':
            return {
                ...state,
                randomArticles: action.value,
            };
        default:
            return state;
    }
}

export default articlesReducer;
