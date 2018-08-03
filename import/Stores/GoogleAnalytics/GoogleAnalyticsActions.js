import * as actionTypes from './GoogleAnalyticsActionTypes';

export const requestAccounts = () => {
    return (dispatch) => {

        dispatch({
            type: actionTypes.REQUEST_ACCOUNTS
        });

        const t = Meteor.call('google.analytics.management.accounts.get', (error,result) => {
            if(error) dispatch( retrievedAccountsFailed(error) );
            if(result) dispatch( retrievedAccountsSuccess(result));
         });
    }
}

const retrievedAccountsFailed = (error) => {
    return {
        type: actionTypes.RETRIEVED_ACCOUNTS_FAILED,
        error,
    }
}

const retrievedAccountsSuccess = (result) => {
    return (dispatch) => {
        dispatch( {
            type: actionTypes.RETRIEVED_ACCOUNTS_SUCCESS,
            accounts: result.items,
        } );

        const account = result.items[0];
        dispatch( requestWebProperties(account.id) );
    }
}

export const requestWebProperties = (accountId) => {
    return (dispatch) => {

        dispatch({
            type: actionTypes.REQUEST_WEBPROPERTIES,
            accountId,
        });

        const t = Meteor.call('google.analytics.management.webproperties.get', accountId, (error,result) => {
            if(error) dispatch( retrievedWebPropertiesFailed(error) );
            if(result) dispatch( retrievedWebPropertiesSuccess(result));
         });
    }
}

const retrievedWebPropertiesSuccess = (result) => {
    return (dispatch) => {
        dispatch( {
            type: actionTypes.RETRIEVED_WEBPROPERTIES_SUCCESS,
            webProperties: result.items,
        } );
        if(result.items.length > 0){
            const webProperty = result.items[0];
            dispatch( requestProfiles(webProperty.accountId, webProperty.id) );
        }
    }
}

const retrievedWebPropertiesFailed = (error) => {
    return {
        type: actionTypes.RETRIEVED_PROFILES_FAILED,
        error,
    }
}

export const requestProfiles = (accountId,webPropertyId) => {
    return (dispatch) => {

        dispatch({
            type: actionTypes.REQUEST_PROFILES,
            webPropertyId,
        });

        const t = Meteor.call('google.analytics.management.profiles.get', accountId, webPropertyId, (error,result) => {
            if(error) dispatch( retrievedProfilesFailed(error) );
            if(result) dispatch( retrievedProfilesSuccess(result));
         });
    }
}

const retrievedProfilesSuccess = (result) => {
    return {
        type: actionTypes.RETRIEVED_PROFILES_SUCCESS,
        profiles: result.items,
    }
}

const retrievedProfilesFailed = (error) => {
    return {
        type: actionTypes.RETRIEVED_PROFILES_FAILED,
        error,
    }
}

export const requestData = (profileId,options = {}) => {
    return (dispatch) => {

        dispatch({
            type: actionTypes.REQUEST_DATA,
            profileId,
            options,
        });

        const t = Meteor.call('google.analytics.data.get', profileId, options, (error,result) => {
            if(error) dispatch( retrievedDataFailed(error) );
            if(result) dispatch( retrievedDataSuccess(result) );
         });
    }
}

const retrievedDataSuccess = (result) => {
    return {
        type: actionTypes.RETRIEVED_DATA_SUCCESS,
        data: result,
    }
}

const retrievedDataFailed = (error) => {
    return {
        type: actionTypes.RETRIEVED_DATA_FAILED,
        error,
    }
}