import React from "react";
import { render } from "react-dom";

import UserList from "./components/UserList";
import Form from "./components/Form";
import Filter from "./components/Filter";
import UserStore from "./stores/UserStore";

const store = new UserStore();
store.loadRegisters();

const headers = [
  { key: 1, text: "Username", alignClass: "" },
  { key: 2, text: "Name", alignClass: "" },
  { key: 3, text: "E-mail", alignClass: "_" },
  { key: 4, text: "City", alignClass: "" },
  { key: 5, text: "Ride in Group", alignClass: "" },
  { key: 6, text: "Day of the week", alignClass: "" },
  { key: 7, text: "Posts", alignClass: "" },
  { key: 8, text: "Albums", alignClass: "" },
  { key: 9, text: "Photos", alignClass: "" }
];

render(
  <div className="app-pa--75">
    <div className="app-row">
      <span className="app-title">Users</span>
      <div className="app-column app-divider app-mh--50" />
      <div style={{ display: "inline-flex" }}>
        <Filter
          name="search"
          onFilter={valorDaPesquisa => store.search(valorDaPesquisa)}
          placeholder="Filter table content"
        />
      </div>
    </div>

    <div className="app-row">
      <UserList headers={headers} store={store} />
    </div>

    <div className="app-row app-mt--25">
      <span className="app-title">Registration</span>
      <div className="app-column app-divider app-ml--50" />
    </div>

    <div className="app-row">
      <div className="app-column">
        <div className="app-row app-register-title">Need help?</div>
        <div className="app-row">
          <div className="app-column app-registration-icons _80--fixed app-mr--25">
            <i className="fa fa-life-ring" />
          </div>
          <div className="app-column app-mr--25 app-register-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>

      <div className="app-column">
        <div className="app-row app-register-title">Why register?</div>
        <div className="app-row">
          <div className="app-column app-registration-icons _80--fixed app-mr--25">
            <i className="fa fa-heartbeat" />
          </div>
          <div className="app-column app-mr--25 app-register-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>

      <div className="app-column">
        <div className="app-row app-register-title">
          What people are saying...
        </div>
        <div className="app-row">
          <div className="app-column app-registration-icons _80--fixed">
            <i className="far fa-smile" />
          </div>
          <div className="app-column app-register-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>

    <div className="app-row app-mh--150 app-mt--50">
      <div className="app-column app-divider" />
    </div>

    <div className="app-row app-mh--150">
      <Form store={store} />
    </div>
  </div>,
  document.getElementById("root")
);

window.store = store;
