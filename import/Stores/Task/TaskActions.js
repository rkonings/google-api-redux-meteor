import * as actionTypes from './TaskActionTypes';
import Tasks from '../../Collections/Tasks';
import { Tracker } from 'meteor/tracker';

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

export const subscribeSuccess = (subscription) => {
    return dispatch => {
        const t = Tracker.autorun((t) => {
            dispatch( retrieved(Tasks.find({}, {sort: {createdAt: -1}}).fetch()) );
        });
        dispatch({
            type: actionTypes.SUBSCRIBE_TASKS_SUCCESS,
            subscription,
            tracker: t,
        });
    }
}

export const unsubscribe = () => {
    return (dispatch, getState) => {
        const tracker = getState().task.tracker;
        const subscription = getState().task.subscription;
        subscription.stop();
        tracker.stop();


        dispatch({
            type: actionTypes.UNSUBSCRIBE_TASKS,
        });
  
    }

}

export const retrieved = (tasks) => {
    return {
        type: actionTypes.RETRIEVED_TASKS,
        tasks: tasks,
    }
}

export const add = (task) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_TASK_START,
            task,
        });
        const t = Meteor.call('task.insert', task, (error,result) => {
            if(!error){
                dispatch({
                    type: actionTypes.ADD_TASK_SUCCESS,
                    taskId: result,
                });
            }
            else{
                dispatch({
                    type: actionTypes.ADD_TASK_FAILED,
                    error,
                });
            }
        });
    }
}

export const remove = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REMOVE_TASK_START,
            id,
        });
        const t = Meteor.call('task.remove', id, (error,result) => {
            if(!error){
                dispatch({
                    type: actionTypes.REMOVE_TASK_SUCCESS,
                    taskId: result,
                });
            }
            else{
                dispatch({
                    type: actionTypes.REMOVE_TASK_FAILED,
                    error,
                });
            }
        });
    }
}