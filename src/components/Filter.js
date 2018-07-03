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
    this.submitForm = this.submitForm.bind(this);
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
      this.setState(
        { clearFieldIsVisible: false },
        this.props.onFilter(this.searchFiled.value)
      );
    }
  }

  submitForm(e) {
    e.preventDefault();
    if (this.props.onFormSubmit) {
      this.props.onFormSubmit(this.searchFiled.value);
    }
  }

  render() {
    const timesIconStyle = {
      paddingTop: "10px",
      marginLeft: "-25px",
      cursor: "pointer"
    };

    const {
      applyFilterButtonLabel,
      cancelButtonLabel,
      clearFilterOptionsButtonLabel,
      filterButtonLabel,
      placeholder,
      children
    } = this.props;

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
      <form className="" onSubmit={e => this.submitForm(e)}>
        <div className="">
          <span className="">
            <i className="fa fa-search fa-fw" />
          </span>
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
  applyFilterButtonLabel: "Aplicar Filtro",
  cancelButtonLabel: "Cancelar",
  clearFilterOptionsButtonLabel: "Limpar Filtro",
  filterButtonLabel: "Opções",
  placeholder: "Buscar"
};

Filter.propTypes = {
  applyFilterButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  clearFilterOptionsButtonLabel: PropTypes.string,
  filterButtonLabel: PropTypes.string,
  onClearAll: PropTypes.func,
  onFilter: PropTypes.func,
  onFormSubmit: PropTypes.func,
  placeholder: PropTypes.string
};

Filter.displayName = "Filter";
export default Filter;
