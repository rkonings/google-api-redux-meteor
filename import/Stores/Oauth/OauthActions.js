import * as actionTypes from './OauthActionTypes';
import { Tracker } from 'meteor/tracker';

/*
export const subscribe = () => {
    return (dispatch) => {

        dispatch({
            type: actionTypes.SUBSCRIBE_TASKS
        });
        const callback = {
            onReady: () => {
                dispatch( subscribeSuccess(subscription) )
            },
            onStop: () => {
                dispatch({
                    type: actionTypes.UNSUBSCRIBE_TASKS_SUCCESS,
                });
            },
        }
        const subscription = Meteor.subscribe('tasks.private',{},callback);
    }
}
*/