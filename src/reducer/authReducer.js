const initialLoginState = {
    email: '',
    password: '',
};

function authReducer(state = initialLoginState, action) {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.value,
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.value,
            };
        default:
            return state;
    }
}

export default authReducer
