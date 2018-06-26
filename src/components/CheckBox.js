import React, { Component } from "react";
import PropTypes from "prop-types";
import _find from "lodash/find";

class CheckBox extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selecteds != this.props.selecteds;
  }

  _addValue(value) {
    this.props.addValuesToList(value);
  }

  _getValues() {
    return this.props.values.map((item, i) => {
      return (
        <label key={`item-${item}-${i}`}>
          <i
            className={
              _find(
                this.props.selecteds,
                element =>
                  element[this.props.nameValue] == item[this.props.nameValue]
              )
                ? "fa fa-check-square-o fa-fw"
                : "fa fa-square-o fa-fw"
            }
          />
          <input
            className="sv-pa--0 display-none"
            onClick={() => this._addValue(item)}
            style={{ width: "0" }}
            type="checkbox"
            value={item[this.props.nameValue]}
          />
          {item[this.props.nameLabel]}
        </label>
      );
    });
  }

  render() {
    return (
      <div className="sv-column">
        <span>{this.props.label ? this.props.label + ":" : ""}</span>
        {this._getValues()}
      </div>
    );
  }
}

CheckBox.propTypes = {
  addValuesToList: PropTypes.func.isRequired,
  label: PropTypes.string,
  nameLabel: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  selecteds: PropTypes.array,
  values: PropTypes.array.isRequired
};

CheckBox.defaultProps = {
  selected: undefined
};

export default CheckBox;
