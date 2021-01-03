import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  handleError,
} from "../actions/users";
import UsersList from "./UsersList";
import NewUserForm from "./NewUserForm";
class App extends Component {
  constructor(props) {
    super(props);
    this.props.getUsersRequest();
  }
  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({
      firstName,
      lastName,
    });
  };
  handleDelete = (userId) => {
    this.props.deleteUserRequest(userId);
  };
  handleCloseAlert = () => {
    this.props.handleError({ error: "" });
  };
  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <Alert
          isOpen={!!this.props.users.error}
          color="danger"
          toggle={this.handleCloseAlert}
        >
          {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={users.items} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  handleError,
})(App);
