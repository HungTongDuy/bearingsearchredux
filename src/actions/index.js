import axios from 'axios'

import { URL, API_bearingDimensions, API_bearingTypes, API_bearings } from '../constants/constants.js';
var urlBearingTypes = URL + API_bearingTypes ;
var urlDimension = URL + API_bearingDimensions;

export function fetchBearingTypes(dispatch) {
    console.log('fetchBearingTypes', urlBearingTypes);
    dispatch(fetchPostsRequest());
    return (dispatch) => {
        axios.get(urlBearingTypes)
        .then((response) => {
          dispatch(fetchPostsSuccess(response.data))
        })
        .catch((error) => {
          dispatch(fetchPostsError(error))
        })
    };
}

export function fetchBearingDimensions(dispatch) {
    console.log('fetchBearingDimensions', urlDimension);
    dispatch(fetchPostsRequest());
    return (dispatch) => {
        axios.get(urlDimension)
        .then((response) => {
          dispatch(fetchPostsSuccess(response.data))
        })
        .catch((error) => {
          dispatch(fetchPostsError(error))
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

export function fetchPostsRequest() {
    console.log('fetchPostsRequest');
    return {
        type: "FETCH_REQUEST"
    }
}

export function fetchPostsSuccess(payload) {
    console.log('fetchPostsSuccess', payload);
    return {
      type: "FETCH_SUCCESS",
      payload
    }
}
  
export function fetchPostsError(payload) {
    return {
      type: "FETCH_ERROR",
      payload
    }
}