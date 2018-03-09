import React, { Component } from 'react';
// eslint-disable-next-line
import logo from "../images/logo.jpg";
// eslint-disable-next-line
import { Row, Col, Checkbox } from 'antd';
// eslint-disable-next-line
import BearingDimension from './bearingDimension.js';
// eslint-disable-next-line
import SearchResult from './searchResult.js';
// eslint-disable-next-line
import BearingType from './bearingType.jsx';
// eslint-disable-next-line
import { URL, API_bearingDimensions, API_bearingTypes, API_bearings } from '../constants/constants.js';

import { fetchBearingTypes, fetchPostsRequest, fetchPostsSuccess, fetchPostsError } from '../actions';
import { connect } from 'react-redux';
// eslint-disable-next-line
const CheckboxGroup = Checkbox.Group;
// eslint-disable-next-line
var urlDimension = URL + API_bearingDimensions;
// eslint-disable-next-line
var urlResult = URL + API_bearings;
var urlBearingTypes = URL + API_bearingTypes;

class App extends Component {

	componentDidMount() {
		this.props.dispatch(fetchBearingTypes(this.props.dispatch));
	}

	render() {
		console.log('bearingTypes-- ', this.props.bearingTypes);
		console.log('isLoading-- ', this.props.isLoading);
		if (this.props.isLoading) {
			return (
				<div>
					<div className="logo">
						<div className="container">
							<img src={logo} title="logo" />
							<span className="main-title">Bearing Search</span>
						</div>
					</div>
					<div className="search-content">
						<div className="container">
							<div className="row">
								<div className="loading-type">
									<i className="fa fa-spinner fa-pulse"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div className="logo">
					<div className="container">
						<img src={logo} title="logo" />
						<span className="main-title">Bearing Search</span>
					</div>
				</div>
				<div className="search-content">
					<div className="container">
						<div className="row">
						{/* <BearingType 
							bearingTypes= {this.props.bearingTypes}
							getTypeByCarousel = {"carousel"}
							getTypeBySelection = {"selection"}
							selectedType = {1}
						/> */}
						<ul>
							{   !this.props.bearingTypes ? 
								this.props.bearingTypes.map((post, k) =>{
									return (
										<li>{post.title}</li>
									)
								}) : 'abc'
							}
						</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
// eslint-disable-next-line
function SearchLoading() {
	return (
		<div className="ant-message loading-search">
			<div className="loading-search-message-notice">
				<div className="loading-search-message-notice-content">
					<div className="loading-search-message-custom-content loading-search-message-loading">
						<i className="fa fa-spinner fa-pulse"></i>
					</div>
				</div>
			</div>
		</div>
	);
}
function mapStateToProps(state){
	console.log('state: ', state);
	return {  
		bearingTypes: state.bearingTypes.items,
		bearingDimension: state.bearingDimension,
		isLoading: state.bearingTypes.isLoading
  	}
}
App = connect(mapStateToProps)(App)
export default App;
