import React, { Component } from "react";
import { connect } from "react-redux";
import { UnMountAlertAction } from "../../../Actions/UnMountActions";

function mapStateToProps(state) {
  return {};
}

class Category extends Component {
  constructor(params) {
    super(params);
    this.state = {
      Categories: []
    };
  }
  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }

  componentDidMount() {
    this.setState({
      Categories: [
        { Name: "Biscuits" },
        { Name: "Sandwich" },
        { Name: "Drinks" }
      ]
    });
  }

  render() {
    return (
      <div className="Category">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.Categories.map((Category, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{Category.Name}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { UnMountAlertAction }
)(Category);
