import * as actionTypes from './MessageActionTypes';

const initialState = {
    subscribed: false,
    fetching: false,
    updating: false,
    adding: false,
    removing: false,
    error: false,
    messages: [],
};

const fetchMessagesStart = (state, action) => {
    return {
        ...state,
        fetching: true
    }
}

const fetchMessagesSuccess = (state, action) => {
    return {
        ...state,
        messages: action.messages,
        fetching: false,  
    };
}

const fetchMessagesFailed = (state, action) => {
    return {
        ...state,
        fetching: false,
        error: action.error,  
    };
}

const addMessageStart = (state, action) => {
    return {
        ...state,
        adding: true,
    };
}

const addMessageSuccess = (state, action) => {
    return {
        ...state,
        adding: false,
    };
}

const addMessageFailed = (state,action) => {
    return {
        ...state,
        adding: false,
        error: action.error,  
    };
}

const updateMessageStart = (state, action) => {
    return {
        ...state,
        updating: true,
    };

}

const updateMessageSuccess = (state, action) => {
    return {
        ...state,
        updating: false,
    };

}

const updateMessageFailed = (state, action) => {
    return {
        ...state,
        updating: false,
        error: action.error,
    };


}

const removeMessageStart = (state, action) => {
    return {
        ...state,
        removing: true,
        taskId: action.taskId,
    };
}

const removeMessageSuccess = (state, action) => {
    return {
        ...state,
        removing: false,
    };

}

const removeMessageFailed = (state, action) => {
    return {
        ...state,
        removing: false,
        error: action.error,
    };
}

const subsribeSuccess = (state, action) => {
    return {
        ...state,
        subscribed: true,
        subscription: action.subscription,
    }
}

const retrieved = ( state, action ) => {
    return {
        ...state,
        messages: action.messages,
    }
}


const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        case actionTypes.FETCH_MESSAGES_START: return fetchMessagesStart( state, action );
        case actionTypes.FETCH_MESSAGES_SUCCESS: return fetchMessagesSuccess( state, action );
        case actionTypes.FETCH_MESSAGES_FAILED: return fetchMessagesFailed( state, action );

        case actionTypes.ADD_MESSAGE_START: return addMessageStart( state, action );
        case actionTypes.ADD_MESSAGE_FAILED: return addMessageFailed( state, action );
        case actionTypes.ADD_MESSAGE_SUCCESS: return addMessageSuccess( state, action );

        case actionTypes.UPDATE_MESSAGE_START: return updateMessageStart( state, action );
        case actionTypes.UPDATE_MESSAGE_SUCCESS: return updateMessageSuccess( state, action );
        case actionTypes.UPDATE_MESSAGE_FAILED: return updateMessageFailed( state, action );

        case actionTypes.REMOVE_MESSAGE_START: return removeMessageStart( state, action );
        case actionTypes.REMOVE_MESSAGE_SUCCESS: return removeMessageSuccess( state, action );
        case actionTypes.REMOVE_MESSAGE_FAILED: return removeMessageFailed( state, action );

        case actionTypes.SUBSCRIBE_MESSAGES_SUCCESS: return subsribeSuccess( state, action );
        case actionTypes.RETRIEVED_MESSAGES: return retrieved( state, action );

        default: return state;

    }

};

export default reducer;