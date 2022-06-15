const initialState = {
    article: {
        _id: '',
        title: '',
        description: '',
        imageUrl: '',
        imageFile: null,
        previewImage: null,
    },
};

function updateArticleReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_UPDATE_TITLE':
            return {
                ...state,
                article: {
                    ...state.article,
                    title: action.payload.title,
                },
            };
        case 'SET_UPDATE_DESCRIPTION':
            return {
                ...state,
                article: {
                    ...state.article,
                    description: action.payload.description,
                },
            };
        case 'SET_UPDATE_IMAGEFILE':
            return {
                ...state,
                article: {
                    ...state.article,
                    imageFile: action.payload.imageFile,
                },
            };
        case 'SET_PREVIEWIMAGE':
            return {
                ...state,
                article: {
                    ...state.article,
                    previewImage: action.value,
                },
            };
        default:
            return state;
    }
}

export default updateArticleReducer;
