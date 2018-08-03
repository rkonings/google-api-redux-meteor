import * as actionTypes from './GoogleAnalyticsActionTypes';

const initialState = {
    accounts: [],
    webProperties: [],
    profiles: [],
    selectedProfile: null,
    error: null,
    requesting: null,
    data: null,

};

const requestAccounts = ( state, actions ) => {
    return {
        ...state,
        requesting: true,
        error: null,
    }
}

const retrievedAccountsSuccess = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        accounts: action.accounts,
        error: null,

    }
}

const retrievedAccountFailed = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        error: action.error,
    }
}

const requestWebProperties = ( state, actions ) => {
    return {
        ...state,
        requesting: true,
        error: null,
        webProperties: [],
        profiles: [],
    }
}

const retrievedWebPropertiesSuccess = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        webProperties: action.webProperties,
        error: null,

    }
}

const retrievedWebPropertiesFailed = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        error: action.error,
    }
}

const requestProfiles = ( state, actions ) => {
    return {
        ...state,
        requesting: true,
        error: null,
        profiles: [],
    }
}

const retrievedProfilesSuccess = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        profiles: action.profiles,
        error: null,

    }
}

const retrievedProfilesFailed = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        error: action.error,
    }
}

const requestData = ( state, actions ) => {
    return {
        ...state,
        requesting: true,
        data: null,
        error: null,
    }
}

const retrievedDataSuccess = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        data: action.data,
        error: null,

    }
}

const retrievedDataFailed = ( state, action ) => {
    return {
        ...state,
        requesting: false,
        error: action.error,
    }
}

const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        case actionTypes.REQUEST_ACCOUNTS: return requestAccounts( state, action );
        case actionTypes.RETRIEVED_ACCOUNTS_SUCCESS: return retrievedAccountsSuccess( state, action );
        case actionTypes.RETRIEVED_ACCOUNTS_FAILED: return retrievedAccountFailed ( state, action );

        case actionTypes.REQUEST_WEBPROPERTIES: return requestWebProperties( state, action );
        case actionTypes.RETRIEVED_WEBPROPERTIES_SUCCESS: return retrievedWebPropertiesSuccess( state, action );
        case actionTypes.RETRIEVED_WEBPROPERTIES_FAILED: return retrievedWebPropertiesFailed( state, action );

        case actionTypes.REQUEST_PROFILES: return requestProfiles( state, action );
        case actionTypes.RETRIEVED_PROFILES_SUCCESS: return retrievedProfilesSuccess( state, action );
        case actionTypes.RETRIEVED_PROFILES_FAILED: return retrievedProfilesFailed( state, action );

        case actionTypes.REQUEST_DATA: return requestData( state, action );
        case actionTypes.RETRIEVED_DATA_SUCCESS: return retrievedDataSuccess( state, action );
        case actionTypes.RETRIEVED_DATA_FAILED: return retrievedDataFailed( state, action );

        default: return state;
    }

};

export default reducer;