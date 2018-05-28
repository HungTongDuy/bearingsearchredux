"use strict";
import React, { Component } from 'react';
// eslint-disable-next-line
import logo from "../images/logo.jpg";
// eslint-disable-next-line
import { Row, Col, Checkbox } from 'antd';
// eslint-disable-next-line
import BearingDimension from './bearingDimension';
// eslint-disable-next-line
import SearchResult from './searchResult';
// eslint-disable-next-line
import BearingType from './bearingType';
// eslint-disable-next-line
import { URL, API_bearingDimensions, API_bearingTypes, API_bearings } from '../constants/constants.js';

import { fetchBearingTypes, filterDrawing } from '../actions';
import { connect } from 'react-redux';
// eslint-disable-next-line
const CheckboxGroup = Checkbox.Group;
// eslint-disable-next-line
var urlDimension = URL + API_bearingDimensions;
// eslint-disable-next-line
var urlResult = URL + API_bearings;
var urlBearingTypes = URL + API_bearingTypes;

class App extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
		this.props.fetchBearingTypes();
	}

	//filter duplicate part number
	filterPartNumber(result) {
		console.log('filterPartNumber');
		var filterPartNumber = [];
		result.map((item,k) => {
			if (filterPartNumber.indexOf(item.part_number) === -1) {
				
				filterPartNumber.push(item.part_number);
			}
		});
		filterPartNumber = filterPartNumber.sort(function(a,b) {return a - b});

		return filterPartNumber;
	}

	//handle filter drawing id in result list
	handleFilterDrawing(beforeFilterResult, checkedList) {
		console.log('beforeFilterResult', beforeFilterResult);
		console.log('checkedList', checkedList);
		var filterResult = [];
		checkedList.map((item_checked,k) => {
			beforeFilterResult.map((item,key) => {
				if (item.part_number === item_checked) {
					filterResult.push(item);
				}
			});
		});

		this.props.filterDrawing(filterResult, checkedList);
	}

	render() {
		console.log('render-app');
		if (this.props.result) {
			//var img_path = "./public/images/Bearings/";
			var filterPartNumber = this.filterPartNumber(this.props.beforeFilterResult);
			var OptionCheckbox = filterPartNumber.map((el,k) => {
				return (
					<Col className="checkbox-item" key={k}><Checkbox value={el}><img className="img-checkbox" src={require(`../images/Bearings/${el}.png`)} />{el}</Checkbox></Col>
				);
			});
		}

		if (this.props.bearingTypesLoading ) {
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
		//console.log('bearingdimension-- ', this.props.bearingDimension);
		return (
			<div>
				<div className={(this.props.bearingTypesLoading 
					|| this.props.dimensionsLoading 
					|| this.props.searchResultLoading) 
					? 'progress-search': ''}>

					<div className="logo">
						<div className="container">
							<img src={logo} title="logo" />
							<span className="main-title">Bearing Search</span>
						</div>
					</div>
					<div className="search-content">
						<div className="container">
								<BearingType />
								<BearingDimension />
						</div>
					</div>
					<div className="clearfix"></div>
					{
						!this.props.result ? "" :
						/* start div result */
						<div className="search-result">
							<div className="container">
								<span className="title-search"></span>
									<div>
										{/* show check box drawing id - default all DRW checked */}
										<CheckboxGroup  value={this.props.checkedList} onChange={e => this.handleFilterDrawing(this.props.beforeFilterResult, e)}>
											<Row>
												{OptionCheckbox}
											</Row>
										</CheckboxGroup>
										{/* show result list */}
										<SearchResult resultData={this.props.result} checkedList={this.props.checkedList} typeSearch={this.props.typeSearch} />
									</div>
							</div>
						</div>
						/* end div result */
					}
					{/* <div title='Back to top' className='scroll' id="scroll_top" onClick={this.scrollToTop}></div> */}
				</div>
				{this.props.bearingTypesLoading ? <SearchLoading /> : "" }
				{this.props.dimensionsLoading ? <SearchLoading /> : "" }
				{this.props.searchResultLoading ? <SearchLoading /> : "" }
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

function mapStateToProps(state) {
	console.log('state-app: ', state);
	return {
		bearingTypes: state.bearingTypes.items,
		selectedType: state.bearingTypes.selectedType,
		bearingDimension: state.bearingDimension,
		bearingTypesLoading: state.bearingTypes.isLoading,
		dimensionsLoading: state.bearingDimension.isLoading,
		searchResultLoading: state.result.isSearchLoading,
		result: state.result.result,
		checkedList: state.result.checkedList,
		isHandleSearch: state.result.isHandleSearch,
		beforeFilterResult: state.result.beforeFilterResult,
		typeSearch: state.result.selectedType
  	}
}

App = connect(mapStateToProps, { fetchBearingTypes, filterDrawing })(App)
export default App;
