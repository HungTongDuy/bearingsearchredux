import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchBearingDimensions, sendDimensionFilter } from '../actions';

import { AutoComplete } from 'antd';
import { message, Select } from 'antd';
const Option = Select.Option;

class DimensionSearch extends React.Component {

	constructor() {
		super();
		this.submitSearch = this.submitSearch.bind(this);
		this.getDimensionFilter = this.getDimensionFilter.bind(this);
	}

	getDimensionFilter(inside, outside, thick) {
		this.props.dispatch(sendDimensionFilter(inside, outside, thick));

	}

	submitSearch(val) {
		this.props.sendDimensionToSearch();
	}

	componentWillMount() {
		this.props.dispatch(fetchBearingDimensions(1));
	}

	render() {
		if (!this.props.dimension) {
			return(<div></div>);
		}

		//-------------optionOutsideSelections--------------
		var outsideDiameter = [];
		// outsideDiameter use filter duplicate dimension
		var outsideDiameterObject = [];
		
		//outsideDiameterObject use add Object after filter by outside diameter
		this.props.dimension.map(function (el, i) {
			if (outsideDiameter.indexOf(el.D.toString()) === -1) {
				outsideDiameter.push(el.D.toString());
				outsideDiameterObject.push(el);
			}
		});
		
		outsideDiameterObject.sort(function(a,b) { return a.D - b.D });
		
		let optionOutsideSelections = outsideDiameterObject.map(function (el, k) {
			return (
				<Option key={k} value={el.D_inch}>{el.D_inch}</Option>
			);
		});
		//------------end-optionOutsideSelections--------------

		//-------------optionInsideSelections--------------
		var insideDiameter = [];
		// InsideDiameter use filter duplicate dimension 
		var insideDiameterObject = [];
		// InsideDiameterObject use add Object after filter by inside diameter
		this.props.dimension.map(function (el, i) {
			if (insideDiameter.indexOf((el.d).toString()) == -1) {
				insideDiameter.push((el.d).toString());
				insideDiameterObject.push(el);
			}
		});
		
		insideDiameterObject.sort(function(a,b) { return a.d - b.d; });
		
		let optionInsideSelections = insideDiameterObject.map(function (el, k) {
			return (
				<Option key={k} value={el.d_inch}>{el.d_inch}</Option>
			);
		});
		//------------end-optionInsideSelections--------------

		//-------------optionThicknessSelections--------------
		var thickness = [];
		// thickness use filter duplicate dimension 
		var thicknessObject = [];
		// thicknessDiameterObject use add Object after filter by thickness diameter
		this.props.dimension.map(function (el, i) {
			if (thickness.indexOf(el.B) === -1) {
				thickness.push(el.B);
				thicknessObject.push(el);
			}
		});

		thicknessObject.sort(function(a,b) { return a.B - b.B; });
	
		let optionThicknessSelections = thicknessObject.map(function (el, k) {
			return (
				<Option key={k} value={el.B_inch}>{el.B_inch}</Option>
			);
		});
		//------------end-optionThicknessSelections--------------

		return (
			<div className="col-md-4 col-sm-4 bearing-dimension">
				<div className="input-unit-bearing">
					<div className="row">
						<div className="title-unit">Inside Diameter (d)</div>
						<div className={"sl-unit " + (this.props.selectedInside == "-1" ? "" : "selected")}>
							<Select
								showSearch
								style={{ width: '100%' }}
								dropdownStyle={{ height: 300 }}
								onChange={(e) => this.getDimensionFilter(e, null, null)}
								onEnter={this.getInsideDiameter}
								value={this.props.selectedInside == "-1" ? " Select Inside Diameter (d) " : this.props.selectedInside}
							>
								<Option key="-1" value="-1"> All </Option>
								{optionInsideSelections}
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Outside Diameter (D)</div>
						<div className={"sl-unit " + (this.props.selectedOutside == "-1" ? "" : "selected")}>
							<Select
								showSearch
								style={{ width: '100%' }}
								dropdownStyle={{ height: 300 }}
								optionFilterProp="children"
								placeholder=" Outside Diameter (D) "
								onChange={(e) => this.getDimensionFilter(null, e, null)}
								onEnter={this.getOutsideDiameter}
								value={this.props.selectedOutside == "-1" ? " Select Outside Diameter (D) " : this.props.selectedOutside}
							>
								<Option key="-1" value="-1"> All </Option>
								{optionOutsideSelections}
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="title-unit">Thickness (B)</div>
						<div className={"sl-unit " + (this.props.selectedThick == "-1" ? "" : "selected")}>
							<Select
								showSearch
								style={{ width: '100%' }}
								dropdownStyle={{ height: 300 }}
								optionFilterProp="children"
								placeholder=" Inside Diameter (D) "
								onChange={(e) => this.getDimensionFilter(null, null, e)}
								onEnter={this.getThickness} selectedThick
								value={this.props.selectedThick == "-1" ? " Select Thickness (B) " : this.props.selectedThick}
							>
								<Option key="-1" value="-1"> All </Option>
								{optionThicknessSelections}
							</Select>
						</div>
					</div>
					<div className="row">
						<input type="button"
							className="btn btn-search col-sm-6 col-md-4"
							onClick={this.submitSearch}
							value="Search" />
						{/* {this.props.isSearchLoading ? <SearchLoading />: ''} */}
					</div>
					<div className="row">
						
					</div>
				</div>
			</div>
		);
	};
}

function SearchLoading() {
	return (
		<div className="loading-pulse-search col-sm-4 col-md-4">
			<i className="fa fa-spinner fa-pulse"></i>
		</div>
	);
}

DimensionSearch.propTypes = {
	dimension : PropTypes.array,
	sendBearingDimension : PropTypes.func,
	sendDimensionFilter : PropTypes.func,
	selectedOutside : PropTypes.string,
	selectedInside : PropTypes.string,
	selectedThick : PropTypes.string,
	isSearchLoading : PropTypes.bool
};

function mapStateToProps(state){
	return {  
		dimension: state.bearingDimension.items,
		isLoading: state.bearingDimension.isLoading,
		selectedType: state.bearingDimension.selectedType,
		bearingTypesLoading: state.bearingTypes.isLoading,
		selectedInside: state.bearingDimension.selectedInside,
		selectedOutside: state.bearingDimension.selectedOutside,
		selectedThick: state.bearingDimension.selectedThick
  	}
}
DimensionSearch = connect(mapStateToProps)(DimensionSearch);
export default DimensionSearch;
