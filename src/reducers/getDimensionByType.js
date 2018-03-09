function getDimensionByType(state = [], action) {
    switch(action.type) {
        case 'CHANGE_TYPE' :
            return [
                {
                    type_id: action.bearingType
                }
            ]
        default:
            return state
    }   
}

export default getDimensionByType;