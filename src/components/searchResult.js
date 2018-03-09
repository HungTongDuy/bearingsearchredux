import React from 'react';
import PropTypes from 'prop-types';

class SearchResult extends React.Component {

	render() {
		var img_path = "./public/images/Bearings/";
		var list_item = this.props.resultData.map((item, key) => {
			var defineClass = '';
			if ((key % 3) === 0) {
				defineClass = 'left';
			} else if ((key % 3) === 1) {
				defineClass = 'center';
			} else {
				defineClass = 'right';
			}

			var splitReference = "";
			splitReference = <h3 className="result-title">{item.reference}</h3>;

			var comp_1 = <h3 className="result-title">{item.comp_1}</h3>;
			var comp_2 = <h3 className="result-title">{item.comp_2}</h3>;
			var comp_3 = <h3 className="result-title">{item.comp_3}</h3>;
			var comp_4 = <h3 className="result-title">{item.comp_4}</h3>;

			var precision = <h3 className="result-title precision-title">PRECISION</h3>;
			
			return (
				<div key={key} className={"col-md-4 col-sm-4 col-xs-12 item-result " + defineClass + " type_" + this.props.typeSearch + " drw-" + item.part_number + (item.isPrecision === true ? " precision" : "")}>
					<div className="item-product">
						<div className="border-product">
							<div className="left-product">
								<img src={img_path + item.part_number + ".png"} />
							</div>
							<div className="right-product">
								{item.isPrecision === true ? precision:""}
								{(item.comp_1 !== "" && item.comp_1 !== 0) ? comp_1 : ""}
								{(item.comp_2 !== "" && item.comp_2 !== 0) ? comp_2 : ""}
								{(item.comp_3 !== "" && item.comp_3 !== 0) ? comp_3 : ""}
								{(item.comp_4 !== "" && item.comp_4 !== 0) ? comp_4 : ""}
								{item.comp_1 === "" && item.comp_2 === "" && item.comp_3 === "" && item.comp_4 === "" ? splitReference : ""}
								<span className="dimension">{"d: " + item.d_inch}</span>
								<span className="dimension">{"D: " + item.D_inch}</span>
								<span className="dimension">{"B: " + item.B_inch}</span>
								<span className="dimension">{item.C !== 0 ? ("C: " + item.C_inch) : ""}</span>
								<span className="dimension">{item.T !== 0 ? ("T: " + item.T_inch) : ""}</span>
								<span className="weight">{"Kg: " + item.kg }</span>
								<span className="brands">{"Brand: " + item.brands}</span>
							</div>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="panel panel-default panel-result">
				<div className="panel-body">
					{list_item}
				</div>
			</div>
		);
	};
}

SearchResult.propTypes = {
	resultData : PropTypes.array,
	typeSearch : PropTypes.number,
	checkedList : PropTypes.array
}

export default SearchResult;
