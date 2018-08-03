import * as actionTypes from './OauthActionTypes';

const initialState = {
    oAuth: null,

};

/*
const addTaskStart = (state, action) => {
    return {
        ...state,
        adding: true,
    };
}
*/


const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        //case actionTypes.ADD_TASK_START: return addTaskStart( state, action );


        default: return state;

    }

};

export default reducer;