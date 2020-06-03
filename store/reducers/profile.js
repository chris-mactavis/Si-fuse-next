import {INCREMENT_CURRENT_STATE} from "../actions/profile";

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
        default:
            return state;
    }
}

export default profile;