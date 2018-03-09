import { combineReducers } from 'redux';
import getDimensionByType from './getDimensionByType';
import getBearingTypes from './getBearingTypes';
const BearingSearch = combineReducers ({
    bearingDimension : getDimensionByType,
    bearingTypes : getBearingTypes
});

export default BearingSearch;