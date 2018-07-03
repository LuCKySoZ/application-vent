import React, { Component } from "react";
import PropTypes from "prop-types";
import _find from "lodash/find";

class CheckBox extends Component {
  constructor(props) {
    super(props);

    this.checkboxStyle = {};
    this.iconClass = "";
    this.styleIcon = "";
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selecteds != this.props.selecteds;
  }

  componentWillMount() {
    if (this.props.type === "square") {
      this.iconClass = "fa fa-check";
      this.checkboxStyle = {
        display: "inline-flex",
        border: "2px solid #69d3be",
        width: 20,
        height: 20,
        borderRadius: 4
      };
      this.styleIcon = {
        minWidth: 20,
        margin: "auto",
        fontSize: 16,
        marginLeft: 2,
        color: "#424242"
      };
    } else if (this.props.type === "circle") {
      this.iconClass = "fa fa-circle";
      this.checkboxStyle = {
        display: "inline-flex",
        border: "2px solid #69d3be",
        width: 20,
        height: 20,
        borderRadius: 20
      };
      this.styleIcon = {
        minWidth: 20,
        margin: "auto",
        fontSize: 14,
        marginLeft: 4,
        color: "#424242"
      };
    }
  }

  _addValue(value) {
    this.props.addValuesToList(value);
  }

  _getValues() {
    return this.props.values.map((item, i) => {
      return (
        <div className="app-column" key={`item-${item}-${i}`}>
          <label className="app-pointer">
            <div style={{ ...this.checkboxStyle }}>
              <i
                style={{ ...this.styleIcon }}
                className={
                  _find(
                    this.props.selecteds,
                    element =>
                      element[this.props.nameValue] ==
                      item[this.props.nameValue]
                  )
                    ? this.iconClass
                    : ""
                }
              />
              <input
                className="display-none"
                onClick={() => this._addValue(item)}
                style={{ width: "0" }}
                type="checkbox"
                value={item[this.props.nameValue]}
              />
              <span style={{ margin: "auto" }}>
                {item[this.props.nameLabel]}
              </span>
            </div>
          </label>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="app-column" style={{ ...this.props.columnStyle }}>
        <div className="app-row">
          {this.props.isRequired ? (
            <span>
              <b>{this.props.label ? this.props.label + ":" : ""}</b>
            </span>
          ) : (
            <span>{this.props.label ? this.props.label + ":" : ""}</span>
          )}
        </div>

        <div className="app-row">{this._getValues()}</div>
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
  values: PropTypes.array.isRequired,
  type: PropTypes.oneOf(["square", "circle"]),
  isRequired: PropTypes.bool,
  columnStyle: PropTypes.object
};

CheckBox.defaultProps = {
  type: "square",
  selected: undefined
};

export default CheckBox;
