import * as actionTypes from './MessageActionTypes';
import Messages from '../../Collections/Messages';

export const subscribeSuccess = (subscription) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SUBSCRIBE_MESSAGES_SUCCESS,
            subscription,
        });

        // will run every time Messages changes
        Tracker.autorun(() => {
            dispatch( retrieved(Messages.find({}).fetch()) );
        });
    }
}

export const retrieved = (messages) => {
    return {
        type: actionTypes.RETRIEVED_MESSAGES,
        messages: messages,
    }
}

export const subscribe = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.SUBSCRIBE_MESSAGES
        });

        const subscription = Meteor.subscribe('messages.public',{},() => {
            dispatch( subscribeSuccess(subscription) )
        });


    }
}
