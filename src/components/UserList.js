import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import _isEmpty from "lodash/isEmpty";
import _isString from "lodash/isString";
import _map from "lodash/map";

@observer
export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
  }

  removeUser(id) {
    this.store.removeUser(id);
  }

  renderRow(user, index) {
    return (
      <tr
        className="app-row-table-user"
        id="app-row-table-user"
        key={`row-${user.id}-${index}`}
      >
        <td className="app-column-table-user">{user.username}</td>
        <td className="app-column-table-user">{user.name}</td>
        <td className="app-column-table-user">
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </td>
        <td className="app-column-table-user">
          {!user.address.geo ? (
            user.address.city
          ) : (
            <a
              href={`https://maps.google.com/?ll=${user.address.geo.lat},${
                user.address.geo.lng
              }`}
              target="_blank"
            >
              {user.address.city}
            </a>
          )}
        </td>
        <td className="app-column-table-user">
          {this.store.getRideInGroupByUser(user.id)}
        </td>
        <td className="app-column-table-user">
          {this.store.getDaysOfTheWeek(user.id)}
        </td>
        <td className="app-column-table-user">
          {this.store.getPostByUser(user.id)}
        </td>
        <td className="app-column-table-user">
          {this.store.getAlbumsByUser(user.id)}
        </td>
        <td className="app-column-table-user">
          {this.store.getPhotosByUser(user.id)}
        </td>
        <td className="app-column-table-user">
          <div
            onClick={() => this.removeUser(user.id)}
            className="app-btn-options"
            id="app-btn-options"
          >
            <i className="fa fa-trash-o" />
          </div>
        </td>
      </tr>
    );
  }

  renderHeader() {
    return _map(this.props.headers, header => {
      let text = "";
      let alignClassName = "";

      if (!_isString(header.alignClass)) {
        text = header.text;
      } else {
        text = header.text;
        alignClassName = header.alignClass;
      }

      return (
        <td
          className={`app-header-table-user ${alignClassName}`}
          key={`header-${header.key}`}
        >
          {header.text}
        </td>
      );
    });
  }

  render() {
    if (_isEmpty(this.store.userList)) {
      return <div />;
    }
    return (
      <table className="app-table">
        <thead>
          <tr>
            {this.renderHeader()}
            <td className="app-header-table-user" key={`header-options`} />
          </tr>
        </thead>
        <tbody>
          {this.store.userList.map((user, index) =>
            this.renderRow(user, index)
          )}
        </tbody>
      </table>
    );
  }
}

UserList.defaultProps = {
  headers: []
};

UserList.propTypes = {
  headers: PropTypes.array,
  store: PropTypes.object
};
