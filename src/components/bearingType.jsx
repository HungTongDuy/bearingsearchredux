import React from 'react';

import PropTypes from 'prop-types';

import {  Select, Carousel } from 'antd';

import { connect } from 'react-redux';
import { changeTypeByDropdown } from '../actions';

const Option = Select.Option;

var settings_carousel = {
	dots: false,
	speed: 300,
	slidesToShow: 3,
	centerMode: true,
	draggable: true,
	arrows: true,
	focusOnSelect: true,
	centerPadding: '30px',
	infinite: true,
	swipe: true,
	swipeToSlide: true,
	responsive: [
		{ breakpoint: 770, settings: { slidesToShow: 3, centerPadding: '5px' } },
		{ breakpoint: 1000, settings: { slidesToShow: 3 } },
		{ breakpoint: 400, settings: { slidesToShow: 1 } }
	]
};

function changeTypeBySelection(value) {
	console.log('changeTypeBySelection: ', value);
	var numberSlider = "";
	this.props.bearingTypes.map((item,key) => {
		if (item.type == value) {
			numberSlider = key;
		}
	});
	this.props.getTypeBySelection(value);
	this.refs.slider.goTo(numberSlider);
}

//change bearing type when scroll carousel
function changeTypeByCarousel(index) {
	console.log('changeTypeByCarousel: ', index);
	var type = this.props.bearingTypes[index].type;
	this.props.getTypeByCarousel(type);
}

function bearingType({bearingTypes, getTypeByCarousel, getTypeBySelection, selectedType}) {
	var img_path = "../images/BearingTypes/";
	var list_item = bearingTypes.map((item, k) => {
		return (
			<div key={k} className="item" id={"type_" + item.type}>
				<div className="slide-caption">
				
					<img src={require("../images/BearingTypes/image1.png")} />
					<input type="hidden" className="typeId" value={item.type} />
					<h2 className="slide-caption-title" id={item.type}>{item.title}</h2>
				</div>
			</div>
		);
	});

	var list_options = bearingTypes.map((item, k) => 
		<Option key={k} value={item.type}>{item.title}</Option>
	);

	var numberSlider = "";
	bearingTypes.map((item,key) => {
		if (item.type == selectedType) {
			numberSlider = key;
		}
	});

	return (
		<div>
			<div className="row">
				<div className="col-md-8 col-sm-8">
				<span className="title-search">Bearing Type</span>
				<Select
					className="sl-bearingtype" 
					value={selectedType}
					onSelect={e => changeTypeBySelection(e)}
				>
					{list_options}
				</Select>
				</div>
			</div>
			<div className="col-md-8 col-sm-8 bearing-carousel">
				<div className="clearfix"></div>
				<Carousel
					ref='slider'
					{...settings_carousel}
					afterChange={index => changeTypeByCarousel(index)}>
					{list_item}
				</Carousel>
			</div>
		</div>
	);
}

// bearingType.propTypes = {
// 	bearingTypes : PropTypes.arrayOf(
// 		PropTypes.object
// 	),
// 	getTypeByCarousel : PropTypes.func,
// 	getTypeBySelection : PropTypes.func,
// 	selectedType : PropTypes.number
// };

function mapStateToProps(state){
	console.log('state-bearingTypes: ', state);
	return {  
		bearingTypes: state.bearingTypes.items,
		bearingDimension: state.bearingDimension,
		isLoading: state.bearingTypes.isLoading
  	}
}
bearingType = connect(mapStateToProps)(bearingType);
export default bearingType;