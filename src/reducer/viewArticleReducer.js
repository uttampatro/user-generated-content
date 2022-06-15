const initialState = {
    article: {
        _id: '',
        title: '',
        description: '',
        imageUrl: '',
        createdBy: {
            _id: null,
            email: '',
        },
        createdAt: null,
    },
}

function viewArticleReducer(state = initialState, action) {
    switch (action.type) {
        case 'GETTING_ARTICLE_DETAILS':
            return {
                ...state,
                article: action.value
            };
        default:
            return state;
    }
}

export default viewArticleReducer