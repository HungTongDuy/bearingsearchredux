import axios from 'axios'

import { URL, API_bearingDimensions, API_bearingTypes, API_bearings } from '../constants/constants.js';
var urlBearingTypes = URL + API_bearingTypes ;
var urlDimension = URL + API_bearingDimensions;
var urlResult = URL + API_bearings;

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

function fetchBearingTypesRequest() {
    return {
        type: "FETCH_BEARING_TYPES_REQUEST"
    }
}

function fetchBearingTypesSuccess(payload) {
    return {
      type: "FETCH_BEARING_TYPES_SUCCESS",
      payload
    }
}
  
function fetchBearingTypesError(payload) {
    return {
      type: "FETCH_BEARING_TYPES_ERROR",
      payload
    }
}

export function fetchBearingDimensions(type) {
    return (dispatch) => {
        dispatch(fetchDimensionsRequest(type));
        return fetchDimensions(type).then(([response, json]) =>{
            if(response.status === 200) {
                dispatch(fetchDimensionsSuccess(json, type))
            }
            else {
                dispatch(fetchDimensionsError())
            }
        })
    }
}

export function sendDimensionFilter(inside, outside, thick) {
    return {
        type: 'SEND_DIMENSION_FILTER',
        inside: inside,
        outside: outside,
        thick: thick
    }
}

function fetchDimensions(type) {
    return fetch(urlDimension + type, { method: 'GET'})
       .then( response => Promise.all([response, response.json()]));
}

function fetchDimensionsRequest(type) {
    return {
        type : "FETCH_DIMENSIONS_REQUEST",
        selectedType : type
    }
}

function fetchDimensionsSuccess(payload, type) {
    return {
      type: "FETCH_DIMENSIONS_SUCCESS",
      payload,
      selectedType : type
    }
}
  
function fetchDimensionsError(payload) {
    return {
      type: "FETCH_DIMENSIONS_ERROR",
      payload
    }
}

export function doGetBearing(selectedType) {
    return dispatch => Promise.all([
        dispatch(fetchBearingTypes()),
        dispatch(fetchBearingDimensions(selectedType))
    ])
}

export function fetchResult(typeId, inside, outside, thick) {
    var str_inside = "";
    var str_outside = "";
    var str_thick = "";
    
    if (inside.toString() != '' && inside != '-1' && inside != undefined) {
        str_inside = "&d=" + inside;
    }
    if (outside.toString() != '' && outside != '-1' && outside != undefined) {
        str_outside = "&D=" + outside;
    }
    if (thick.toString() != '' && thick != '-1' && thick != undefined) {
        str_thick = "&B=" + thick;
    }

    console.log('result ', urlResult + '?bearing_type=' + typeId + str_inside + str_outside + str_thick);

    return (dispatch) => {
        dispatch(fetchResultRequest());
        axios.get(urlResult + '?bearing_type=' + typeId + str_inside + str_outside + str_thick)
        .then((response) => {
          dispatch(fetchResultSuccess(typeId, response.data))
        })
        .catch((error) => {
          dispatch(fetchResultError(error))
        })
    };
}

function fetchResultRequest() {
    return {
        type: "FETCH_RESULT_REQUEST"
    }
}

function fetchResultSuccess(typeId, payload) {
    return {
      type: "FETCH_RESULT_SUCCESS",
      typeId,
      payload
    }
}
  
function fetchResultError(payload) {
    return {
      type: "FETCH_RESULT_ERROR",
      payload
    }
}

export function filterDrawing(filterResult, checkedList) {
    console.log('filterDrawing');
    return {
        type: "FILTER_DRAWING",
        filterResult, 
        checkedList
    }
}