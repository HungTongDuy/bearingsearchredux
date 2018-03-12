import axios from 'axios'

import { URL, API_bearingDimensions, API_bearingTypes, API_bearings } from '../constants/constants.js';
var urlBearingTypes = URL + API_bearingTypes ;
var urlDimension = URL + API_bearingDimensions;

export function fetchBearingTypes() {
    return (dispatch) => {
        dispatch(fetchBearingTypesRequest());
        axios.get(urlBearingTypes)
        .then((response) => {
          dispatch(fetchBearingTypesSuccess(response.data))
        })
        .catch((error) => {
          dispatch(fetchBearingTypesError(error))
        })
    };
}

export function changeTypeByDropdown(val) {
    return {
            type : 'CHANGE_TYPE',
            bearingType : val,
            changeBy: 'dropdown'
    }
}

export function fetchBearingTypesRequest() {
    return {
        type: "FETCH_BEARING_TYPES_REQUEST"
    }
}

export function fetchBearingTypesSuccess(payload) {
    return {
      type: "FETCH_BEARING_TYPES_SUCCESS",
      payload
    }
}
  
export function fetchBearingTypesError(payload) {
    return {
      type: "FETCH_BEARING_TYPES_ERROR",
      payload
    }
}

export function fetchBearingDimensions(type) {
    return (dispatch) => {
        dispatch(fetchDimensionsRequest());
        return fetchDimensions(type).then(([response, json]) =>{
            if(response.status === 200){
                dispatch(fetchDimensionsSuccess(json))
            }
            else{
                dispatch(fetchDimensionsError())
            }
        })
    }
}

function fetchDimensions(type) {
    return fetch(urlDimension + type, { method: 'GET'})
       .then( response => Promise.all([response, response.json()]));
}

export function fetchDimensionsRequest() {
    return {
        type: "FETCH_DIMENSIONS_REQUEST"
    }
}

export function fetchDimensionsSuccess(payload) {
    return {
      type: "FETCH_DIMENSIONS_SUCCESS",
      payload
    }
}
  
export function fetchDimensionsError(payload) {
    return {
      type: "FETCH_DIMENSIONS_ERROR",
      payload
    }
}