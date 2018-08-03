import * as actionTypes from './TaskActionTypes';

const initialState = {
    subscribed: false,
    fetching: false,
    updating: false,
    adding: false,
    removing: false,
    error: false,
    tasks: [],
    subscription: null,
    tracker: null,
};


const addTaskStart = (state, action) => {
    return {
        ...state,
        adding: true,
    };
}

const addTaskSuccess = (state, action) => {
    return {
        ...state,
        adding: false,
    };
}

const addTaskFailed = (state,action) => {
    return {
        ...state,
        adding: false,
        error: action.error,  
    };
}

const updateTaskStart = (state, action) => {
    return {
        ...state,
        updating: true,
    };

}

const updateTaskSuccess = (state, action) => {
    return {
        ...state,
        updating: false,
    };

}

const updateTaskFailed = (state, action) => {
    return {
        ...state,
        updating: false,
        error: action.error,
    };


}

const removeTaskStart = (state, action) => {
    return {
        ...state,
        removing: true,
        taskId: action.id,
    };
}

const removeTaskSuccess = (state, action) => {
    return {
        ...state,
        removing: false,
    };

}

const subscribeSuccess = (state, action) => {
    return {
        ...state,
        subscribed: true,
        subscription: action.subscription,
        tracker: action.tracker,
    }
}

const unsubscribeSuccess = (state, action) => {
    return {
        ...state,
        subscribed: false,
        subscription: null,
        tracker: null,
    }
}

const retrieved = ( state, action ) => {
    return {
        ...state,
        tasks: action.tasks,
    }
}

const removeTaskFailed = (state, action) => {
    return {
        ...state,
        removing: false,
        error: action.error,
    };
}

const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        case actionTypes.ADD_TASK_START: return addTaskStart( state, action );
        case actionTypes.ADD_TASK_FAILED: return addTaskFailed( state, action );
        case actionTypes.ADD_TASK_SUCCESS: return addTaskSuccess( state, action );

        case actionTypes.UPDATE_TASK_START: return updateTaskStart( state, action );
        case actionTypes.UPDATE_TASK_SUCCESS: return updateTaskSuccess( state, action );
        case actionTypes.UPDATE_TASK_FAILED: return updateTaskFailed( state, action );

        case actionTypes.REMOVE_TASK_START: return removeTaskStart( state, action );
        case actionTypes.REMOVE_TASK_SUCCESS: return removeTaskSuccess( state, action );
        case actionTypes.REMOVE_TASK_FAILED: return removeTaskFailed( state, action );

        case actionTypes.SUBSCRIBE_TASKS_SUCCESS: return subscribeSuccess( state, action );
        case actionTypes.UNSUBSCRIBE_TASKS_SUCCESS: return unsubscribeSuccess( state, action );
        case actionTypes.RETRIEVED_TASKS: return retrieved( state, action );

        default: return state;

    }

};

export default reducer;