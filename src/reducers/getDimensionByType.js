"use strict";
const defaultState = {
    items: [],
    isLoading: false,
    error: null,
    beforeFilterDimensions: [],
    selectedInside: '-1',
    selectedOutside: '-1',
    selectedThick: '-1',
    selectedType: 1
}

const filterDimension = (beforeFilterDimensions, valueInside, valueOutside, valueThick) => {
    var filteredDimensions = [];
    valueOutside = valueOutside.toString();
    valueInside = valueInside.toString();
    valueThick = valueThick.toString();
    //filter dimension selected and push new array
    beforeFilterDimensions.map((item, key) => {
        if ((valueOutside === "-1" || item.D_inch.toString() === valueOutside) 
        && (valueInside === "-1" || item.d_inch.toString() === valueInside)
        && (valueThick === "-1" || item.B_inch.toString() === valueThick)) {
            filteredDimensions.push(item);
        }
    });
    return filteredDimensions;
}

function getDimensionFilter(state, inside, outside, thick) {
    if (inside != null) {
        inside = inside.toString();
    
        return {
            ...state,
            items :  filterDimension(state.beforeFilterDimensions, inside, state.selectedOutside, state.selectedThick),
            selectedInside : inside 
        }
    }

    if (outside != null) {
        outside = outside.toString();
        
        return { 
            ...state,
            items : filterDimension(state.beforeFilterDimensions, state.selectedInside, outside, state.selectedThick),
            selectedOutside : outside 
        }
    }

    if (thick != null) {
        thick = thick.toString();
        return {
            ...state, 
            items : filterDimension(state.beforeFilterDimensions, state.selectedInside, state.selectedOutside, thick),
            selectedThick : thick 
        }
    }
}

function getDimensionByType(state = defaultState, action) {
    //console.log('...state ', state.items);
    switch(action.type) {
        case "FETCH_DIMENSIONS_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null,
                items: [],
                selectedType : action.selectedType
            };

        case "FETCH_DIMENSIONS_SUCCESS":
            return {
                ...state,
                beforeFilterDimensions : action.payload,
                items: action.payload,
                isLoading: false,
                selectedType: action.selectedType,
                selectedInside: '-1',
                selectedOutside: '-1',
                selectedThick: '-1'
            };

        case "FETCH_DIMENSIONS_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
                items: []
            };

        case "SEND_DIMENSION_FILTER":
            return getDimensionFilter(state, action.inside, action.outside, action.thick);

        default:
            return state;
    }
}

export default getDimensionByType;