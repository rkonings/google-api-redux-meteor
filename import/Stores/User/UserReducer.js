import * as actionTypes from './UserActionTypes';

const initialState = {
    user : {},
    loggingIn: false,
    loggedIn: false,
    loggingOut: false,
};


const loginSuccess = (state, action) => {
    return {
        ...state,
        user: action.user,
        loggingIn: false,
        loggedIn: true,
    };
}

const loginFailed = ( state, action ) => {
    return {
        ...state,
        error: action.error,
        loggingIn: false,
    }
}

const login = ( state, action ) => {
    return {
        ...state,
        loggingIn: true,
    }

}

const logout = (state, action ) => {
    return {
        ...state,
        loggingOut: true,
    }
}

const logoutSuccess = (state, action ) => {
    return {
        ...state,
        user: null,
        loggingOut: false,
        loggedIn: false,
    }
}

const logoutFailed = (state, action ) => {
    return {
        ...state,
        error: action.error,
        loggingOut: false,
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.USER_LOGIN: return login( state, action );
        case actionTypes.USER_LOGIN_SUCCESS: return loginSuccess( state, action );
        case actionTypes.USER_LOGIN_FAILED: return loginFailed( state, action );

        case actionTypes.USER_LOGOUT: return logout( state, action );
        case actionTypes.USER_LOGOUT_SUCCESS: return logoutSuccess( state, action );
        case actionTypes.USER_LOGOUT_FAILED: return logoutFailed( state, action );

        default: return state;
    }
};

export default reducer;