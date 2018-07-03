import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import CheckBox from "./CheckBox";

@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;

    this.handleOnClickRideOptions = this.handleOnClickRideOptions.bind(this);
    this.handleOnClickDaysOptions = this.handleOnClickDaysOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
  }

  handleChange(event) {
    this.store.updateNewUserAttr(event.target.value, event.target.id);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.store.saveUser();
  }

  handleDiscard(event) {
    event.preventDefault();
    this.store.discardUser();
  }

  handleOnClickRideOptions(value) {
    this.store.toggleUniqueOptionSelected(value, "rideOptionsSelecteds");
  }

  renderRideOnGroup() {
    return (
      <CheckBox
        addValuesToList={this.handleOnClickRideOptions}
        label={"Ride in group?"}
        nameLabel={"label"}
        nameValue={"id"}
        selecteds={this.store.rideOptionsSelectedsList}
        values={this.store.rideOptionsList}
        type={"circle"}
        isRequired
        columnStyle={{ marginBottom: 14, marginTop: 2 }}
      />
    );
  }

  handleOnClickDaysOptions(value) {
    this.store.toggleOptionSelected(value, "daysOptionsSelecteds");
  }

  renderDaysOfWeek() {
    return (
      <CheckBox
        addValuesToList={this.handleOnClickDaysOptions}
        label={"Days of the week"}
        nameLabel={"label"}
        nameValue={"id"}
        selecteds={this.store.daysOptionsSelectedsList}
        values={this.store.daysOptionsList}
        isRequired
      />
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="app-form">
        <div className="app-row">
          <div className="app-column app-mr--20">
            <label className="app-form-label">
              <span style={{ display: "block" }}>
                <b>Username:</b>
              </span>
              <input
                type="text"
                value={this.store.inputUserName}
                onChange={this.handleChange}
                id="inputUserName"
              />
            </label>
            <label className="app-form-label">
              <span style={{ display: "block" }}>
                <b>Name:</b>
              </span>
              <input
                type="text"
                value={this.store.inputName}
                onChange={this.handleChange}
                id="inputName"
              />
            </label>
            <label className="app-form-label">
              <span style={{ display: "block" }}>
                <b>Email:</b>
              </span>
              <input
                type="text"
                value={this.store.inputEmail}
                onChange={this.handleChange}
                id="inputEmail"
              />
            </label>
          </div>

          <div className="app-column app-ml--20">
            <div className="app-row">
              <label className="app-form-label app-column">
                <span style={{ display: "block" }}>
                  <b>City:</b>
                </span>
                <input
                  type="text"
                  value={this.store.inputCity}
                  onChange={this.handleChange}
                  id="inputCity"
                />
              </label>
            </div>
            <div className="app-row">{this.renderRideOnGroup()}</div>
            <div className="app-row">{this.renderDaysOfWeek()}</div>
          </div>
        </div>

        <div className="app-row">
          <input type="submit" value="Save" />
          <input type="cancel" value="Discard" onClick={this.handleDiscard} />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  store: PropTypes.object
};
