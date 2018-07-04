import React from "react";
import PropTypes from "prop-types";
import _isUndefined from "lodash/isUndefined";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      clearFieldIsVisible: false
    };
    this.doFilterBySearchField = this.doFilterBySearchField.bind(this);
    this.searchFiled;
  }

  toggleClearField() {
    this.setState({
      clearFieldIsVisible: this.searchFiled.value !== ""
    });
  }

  doFilterBySearchField() {
    if (this.props.onFilter) {
      this.props.onFilter(this.searchFiled.value);
    }
  }

  clearSearchField() {
    if (this.props.onFilter) {
      this.searchFiled.value = "";
      this.setState({ clearFieldIsVisible: false });
      this.doFilterBySearchField();
    }
  }

  render() {
    const timesIconStyle = {
      paddingTop: "8px",
      marginLeft: "-22px",
      cursor: "pointer"
    };

    const searchIconStyle = {
      paddingTop: 8,
      paddingLeft: 6,
      height: 19,
      position: "absolute",
      color: "#ccc"
    };

    const { placeholder, children } = this.props;

    let clearFieldIcon = "";

    if (this.state.clearFieldIsVisible) {
      clearFieldIcon = (
        <span>
          <i
            className="fa fa-times"
            onClick={() => this.clearSearchField()}
            style={timesIconStyle}
          />
        </span>
      );
    }

    return (
      <form style={{ margin: "auto" }} onSubmit={e => this.submitForm(e)}>
        <div style={{ display: "inline-flex" }}>
          <i style={searchIconStyle} className="fa fa-search fa-fw" />
          <input
            className="on-center"
            onKeyUp={() => {
              this.toggleClearField();
              this.doFilterBySearchField();
            }}
            placeholder={placeholder}
            ref={searchField => (this.searchFiled = searchField)}
            type="search"
          />
          {clearFieldIcon}
        </div>
      </form>
    );
  }
}

Filter.defaultProps = {
  placeholder: "Search"
};

Filter.propTypes = {
  applyFilterButtonLabel: PropTypes.string,
  onFilter: PropTypes.func,
  onFormSubmit: PropTypes.func,
  placeholder: PropTypes.string
};

Filter.displayName = "Filter";
export default Filter;
