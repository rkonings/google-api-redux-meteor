import axios from 'axios';
import { Meteor } from 'meteor/meteor'
import * as actionTypes from './UserActionTypes';
import SimpleSchema from 'simpl-schema';

export const login = (email,password) => {
    return dispatch => {

        const schema = new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email,
            },
            password: {
                type: String,
                min: 8,
                max: 16,
            }
        });
        const user = {
            email,
            password,
        }

        try{ schema.validate(user)}
        catch(e){
            dispatch( loginFailed( e.message ) );
            return;
        }


        dispatch( {type: actionTypes.USER_LOGIN} );
        
        Meteor.loginWithPassword(email,password, (e) => {
            if(!!e){
                dispatch( loginFailed( e.message ) );
            }else{
                dispatch(loginSuccess(Meteor.user()));
            }
        });
    }
}

export const loginSuccess = (user) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        user,
    }
}

export const loginFailed = (error) => {
    return {
        type: actionTypes.USER_LOGIN_FAILED,
        error,
    }
}

export const logout = () => {
    return dispatch => {
        dispatch ( {type: actionTypes.USER_LOGOUT} );

        Meteor.logout((error) => {
            if(error) dispatch( logoutFailed(error) );
            else dispatch( logoutSuccess() );
        });
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.USER_LOGOUT_SUCCESS,

    }
}

export const logoutFailed = (error) => {
    return {
        type: actionTypes.USER_LOGOUT_FAILED,
        error,
    }
}