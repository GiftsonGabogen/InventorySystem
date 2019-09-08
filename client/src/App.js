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
import Home from "./Components/Home";
import Navbar from "./Components/Header/Navbar";
import Heading from "./Components/Header/Heading";
import Items from "./Components/Pages/Items/Items";
import AddItem from "./Components/Pages/Items/AddItem";
import EditItem from "./Components/Pages/Items/EditItem";
import AddStock from "./Components/Pages/Items/AddStock";
import Category from "./Components/Pages/Items/Category";
import AddCategory from "./Components/Pages/Items/AddCategory";
import StoreHome from "./Components/Store/StoreHome";
import { FetchAllAction } from "./Actions/ItemActions";
import { AuthCheckAction } from "./Actions/CredentialActions";

function mapStateToProps(state) {
  return {
    credentials: state.credential,
    items: state.items
  };
}
const PrivateRoute = ({ component: Component, credential, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      credential.Login === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.FetchAllAction();
    this.props.AuthCheckAction();
  }

  render() {
    return (
      <div className="App row">
        <Route path="/Home" component={Heading} />
        <Route path="/Store" component={Heading} />
        <Route path="/Home" component={Navbar} />
        <Route exact path="/" component={Login} />
        <div className="Home col-9">
          <Switch>
            <PrivateRoute exact path="/Home" component={Home} />
            <PrivateRoute
              credential={this.props.credentials}
              exact
              path="/Home/Items"
              component={Items}
            />
            <PrivateRoute exact path="/Home/Items/Add" component={AddItem} />
            <PrivateRoute exact path="/Home/Items/Edit" component={EditItem} />
            <PrivateRoute
              exact
              path="/Home/Items/AddStock"
              component={AddStock}
            />
            <PrivateRoute
              exact
              path="/Home/Items/Category"
              component={Category}
            />
            <PrivateRoute
              exact
              path="/Home/Items/AddCategory"
              component={AddCategory}
            />
            <PrivateRoute exact path="/Store" component={StoreHome} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { FetchAllAction, AuthCheckAction }
)(App);
