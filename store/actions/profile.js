export const INCREMENT_CURRENT_STATE = 'INCREMENT_CURRENT_STATE';
export const DECREMENT_CURRENT_STATE = 'DECREMENT_CURRENT_STATE';
export const RESET_CURRENT_STATE = 'RESET_CURRENT_STATE';

export const incrementCurrentState = () => ({
    type: INCREMENT_CURRENT_STATE
});

export const decrementCurrentState = () => ({
    type: DECREMENT_CURRENT_STATE
});

export const resetCurrentState = () => ({
    type: RESET_CURRENT_STATE
})