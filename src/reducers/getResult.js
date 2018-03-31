const defaultState = {
    beforeFilterResult : [],
    result: [],
    isHandleSearch: false,
    typeSearch: null,
    isSearchLoading: false,
    checkedList: []
};

//filter duplicate part number
function filterPartNumber(result) {
    var filterPartNumber = [];
    result.map((item,k) => {
        if (filterPartNumber.indexOf((item.part_number).toString()) === -1) {
            filterPartNumber.push(item.part_number);
        }
    });
    filterPartNumber = filterPartNumber.sort(function(a,b) {return a - b});

    return filterPartNumber;
};

const getResult = (state = [], action) => {
    switch(action.type) {
        case "FETCH_RESULT_REQUEST":
            return {
                ...state,
                isSearchLoading: true,
                error: null
            };
        
        case "FETCH_RESULT_SUCCESS":
            return {
                ...state,
                beforeFilterResult : action.payload,
                result: action.payload,
                isHandleSearch: true,
                typeSearch: action.typeId,
                isSearchLoading: false,
                checkedList: filterPartNumber(action.payload)
            };
        
        case "FETCH_RESULT_ERROR":
            return {
                ...state,
                isSearchLoading: false,
                error: action.payload.error,
                items: []
            };

        default :
            return state;
    }
}