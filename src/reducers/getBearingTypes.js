const defaultState = {
    items: [],
    isLoading: false,
    error: null
}

const getBearingTypes = (state = defaultState, action) => {
    console.log('state-getBearingTypes', state);
    console.log('action-bearingtyep', action);
    switch (action.type) {
        case "FETCH_BEARING_TYPES_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case "FETCH_BEARING_TYPES_SUCCESS":
            state.items = action.data;
            state.isLoading = false;
            return state;
        case "FETCH_BEARING_TYPES_ERROR":
            return { 
                ...state,
                isLoading: false,
                error: action.data.error,
                items: []
            };
        default:
            return state;
    }
}

export default getBearingTypes