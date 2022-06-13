const initialLoginState = {
    title: '',
    description: '',
    imageUrl: '',
    imageFile: null,
    previewImage: null,
};

function createArticleReducer(state = initialLoginState, action) {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.value,
            };
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.value,
            };
        case 'SET_IMAGEFILE':
            return {
                ...state,
                imageFile: action.value,
            };
        case 'SET_PREVIEWIMAGE':
            return {
                ...state,
                previewImage: action.value,
            };
        default:
            return state;
    }
}

export default createArticleReducer;
