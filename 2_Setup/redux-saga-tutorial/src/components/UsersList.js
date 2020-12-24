// @flow
import * as React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const UsersList = ({ users }) => {
  return (
    <ListGroup>
      {users
        .sort((a, b) => {
          if (a.firstName > b.firstName) return 1;
          else if (a.firstName < b.firstName) return -1;
          else if (a.lastName > a.lastName) return 1;
          else if (a.lastName < a.lastName) return -1;
          else return -1;
        })
        .map((user) => {
          return (
            <ListGroupItem key={user.id}>
              <section style={{ display: "flex" }}>
                <div style={{ flexGrow: 1, margin: "auto 0" }}>
                  {user.firstName} {user.lastName}
                </div>
                <Button outline color="danger">
                  Delete
                </Button>
              </section>
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
};
export default UsersList;
