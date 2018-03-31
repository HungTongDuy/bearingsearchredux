import { combineReducers } from 'redux';
import getDimensionByType from './getDimensionByType';
import getBearingTypes from './getBearingTypes';
import getResult from './getResult';
const BearingSearch = combineReducers ({
    bearingDimension : getDimensionByType,
    bearingTypes : getBearingTypes,
    result : getResult
});

export default BearingSearch;