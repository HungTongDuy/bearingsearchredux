
const defaultState = {
    items: [],
    isLoading: false,
    error: null,
    selectedType: 1
}

const getBearingTypes = (state = defaultState, action) => {
    switch (action.type) {
        case "FETCH_BEARING_TYPES_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case "FETCH_BEARING_TYPES_SUCCESS":
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                selectedType: 1
            };
        case "FETCH_BEARING_TYPES_ERROR":
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