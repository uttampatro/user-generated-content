const initialLoginState = {
    articles: [],
};

function articlesReducer(state = initialLoginState, action) {
    switch (action.type) {
        case 'GETTING_ALL_ARTICLES':
            return {
                ...state,
                articles: action.value,
            };
        case 'GETTING_ALL_ARTICLES':
            return {
                ...state,
                articles: action.value,
            };
        default:
            return state;
    }
}

export default articlesReducer;
