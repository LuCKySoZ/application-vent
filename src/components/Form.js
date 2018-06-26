import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import CheckBox from "./CheckBox";

@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
  }

  handleChange(event) {}

  handleSubmit(event) {
    event.preventDefault();
  }

  renderRideOnGroup() {
    return (
      <CheckBox
        addValuesToList={this.handleSubmit}
        label={"Ride in group?"}
        nameLabel={"label"}
        nameValue={"id"}
        selecteds={[]}
        values={[]}
      />
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="app-form">
        <div className="app-row">
          <div className="app-column app-mr--20">
            <label className="app-form-label">
              <span style={{ display: "block" }}>Username:</span>
              <input type="text" value={"aa"} onChange={this.handleChange} />
            </label>
            <label className="app-form-label">
              <span style={{ display: "block" }}>Name:</span>
              <input type="text" value={"aa"} onChange={this.handleChange} />
            </label>
            <label className="app-form-label">
              <span style={{ display: "block" }}>Email:</span>
              <input type="text" value={"aa"} onChange={this.handleChange} />
            </label>
          </div>

          <div className="app-column app-ml--20">
            <div className="app-row">
              <label className="app-form-label app-column">
                <span style={{ display: "block" }}>City:</span>
                <input type="text" value={"aa"} onChange={this.handleChange} />
              </label>
            </div>
            <div className="app-row">{this.renderRideOnGroup()}</div>
          </div>
        </div>

        <div className="app-row">
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  store: PropTypes.object
};
