const defaultState = {
    items: [],
    isLoading: false,
    error: null
}

function getDimensionByType(state = [], action) {
    switch(action.type) {
        case "FETCH_DIMENSIONS_REQUEST":
            return {
                isLoading: true,
                error: null
            };
        case "FETCH_DIMENSIONS_SUCCESS":
            console.log('action.payload', action.payload);
            return {
                items: action.payload,
                isLoading: false,
                selectedType: 1
            };
        case "FETCH_DIMENSIONS_ERROR":
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

export default getDimensionByType;