
const defaultState = {
    items: [],
    isLoading: false,
    error: null
}

const getBearingTypes = (state = defaultState, action) => {
    console.log('action: ', action);
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };
        case "FETCH_ERROR":
            return { 
                ...state,
                isLoading: false,
                error: action.payload.error,
                items: []
            };
        default:
            return state;
    }
}

export default getBearingTypes