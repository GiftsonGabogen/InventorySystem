import React from "react";
import "bootstrap";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import { connect } from "react-redux";
import Login from "./Components/Login";
import FacultyNavbar from "./Components/Faculty/FacultyNavbar";
import Heading from "./Components/Header/Heading";
import SuperAdminNavbar from "./Components/SuperAdmin/SuperAdminNavbar";
import Faculty from "./Components/Faculty";
import Reload from "./Components/Reload";
import SuperAdmin from "./Components/SuperAdmin";
import errorPage from "./Components/errorPage";
import { FetchAllUsersAction } from "./Actions/UsersActions";
import {
  FetchAllInventoriesAction,
  FetchAllInventoryLogsAction,
  FetchAllInventoryModifiesAction
} from "./Actions/InventoriesActions";
import { FetchCategoriesAction } from "./Actions/CategoriesActions";
import { FetchLocationsAction } from "./Actions/LocationsActions";
import { AuthCheckAction } from "./Actions/CredentialActions";
import moment from "moment";

function mapStateToProps(state) {
  return {
    credential: state.credential,
    items: state.items
  };
}
const PrivateRoute = ({ component: Component, credential, ...rest }) => (
  <Route {...rest} render={props => (credential.Login === true ? <Component {...props} /> : <Redirect to="/" />)} />
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.FetchAllUsersAction();
    this.props.FetchAllInventoriesAction();
    this.props.FetchCategoriesAction();
    this.props.FetchLocationsAction();
    this.props.FetchAllInventoryLogsAction();
    this.props.FetchAllInventoryModifiesAction();
  }

  render() {
    return (
      <div className="App row">
        <div className="AlertModal">
          <div className="AlertModalForm">
            <h2 className="AlertModalMessage"></h2>
            <div className="form-row">
              <button className="btn btn-primary okButton">Ok</button>
              <button className="btn btn-primary cancelButton">Cancel</button>
            </div>
          </div>
        </div>
        <Route path="/SuperAdmin" component={Heading} />
        <Route path="/Faculty" component={Heading} />

        <Route path="/Faculty" component={FacultyNavbar} />
        <Route path="/SuperAdmin" component={SuperAdminNavbar} />
        <Route exact path="/" component={Login} />
        <div className="col-9 content">
          <Switch>
            <Route exact path="/" render={() => <div></div>} />
            <PrivateRoute credential={this.props.credential} path="/Faculty" component={Faculty} />
            <Route path="/Reload/:url" component={Reload} />

            <PrivateRoute credential={this.props.credential} path="/SuperAdmin" component={SuperAdmin} />
            <Route component={errorPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  FetchAllUsersAction,
  FetchAllInventoriesAction,
  FetchCategoriesAction,
  FetchLocationsAction,
  FetchAllInventoryLogsAction,
  FetchAllInventoryModifiesAction
})(App);
