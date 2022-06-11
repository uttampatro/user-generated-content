const initialLoginState = {
    articles: [],
};

function userArticlesReducer(state = initialLoginState, action) {
    switch (action.type) {
        case 'GETTING_USERS_ARTICLES':
            return {
                ...state,
                articles: action.value,
            };
        default:
            return state;
    }
}

export default userArticlesReducer;