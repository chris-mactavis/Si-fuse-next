import {
    DECREMENT_CURRENT_LEVEL_STATE,
    DECREMENT_CURRENT_STATE, INCREMENT_CURRENT_LEVEL_STATE,
    INCREMENT_CURRENT_STATE,
    RESET_CURRENT_STATE, SET_COMPANY_PROFILE_IMAGE, SET_CURRENT_LEVEL_STATE,
    SET_CURRENT_STATE
} from "../actions/profile";

const initialState = {
    currentState: 1,
    currentLevelState: 1,
    companyProfileImage: '',
    companyName: ''
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_CURRENT_STATE:
            const currentState = state.currentState + 1;
            return {
                ...state,
                currentState
            }
        case INCREMENT_CURRENT_LEVEL_STATE:
            const currentLevelState = state.currentLevelState + 1;
            return {
                ...state,
                currentLevelState
            }
        case DECREMENT_CURRENT_STATE:
            return {
                ...state,
                currentState: state.currentState - 1
            }
        case DECREMENT_CURRENT_LEVEL_STATE:
            return {
                ...state,
                currentLevelState: state.currentLevelState - 1
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
        case SET_CURRENT_LEVEL_STATE:
            return {
                ...state,
                currentLevelState: action.currentLevelState
            }
        case SET_COMPANY_PROFILE_IMAGE:
            console.log(action.props);
            return {
                ...state,
                companyProfileImage: action.props.companyProfileImage,
                companyName: action.props.companyName
            }
        default:
            return state;
    }
}

export default profile;