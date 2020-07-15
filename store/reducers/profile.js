import {
    DECREMENT_CURRENT_STATE,
    INCREMENT_CURRENT_STATE,
    RESET_CURRENT_STATE,
    SET_CURRENT_STATE
} from "../actions/profile";

const initialState = {
    currentState: 1
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_CURRENT_STATE:
            const currentState = state.currentState + 1;
            return {
                ...state,
                currentState
            }
        case DECREMENT_CURRENT_STATE:
            return {
                ...state,
                currentState: state.currentState - 1
            }
        case RESET_CURRENT_STATE:
            return {
                ...state,
                currentState: 1
            }
        case SET_CURRENT_STATE:
            return {
                ...state,
                currentState: action.currentState
            }
        default:
            return state;
    }
}

export default profile;