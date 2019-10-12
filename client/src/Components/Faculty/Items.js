import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: [
        {
          Name: "Speaker",
          Borrower: "Airwin Diongson",
          Quantity: 2,
          Date: "Sep 23 2019"
        },
        {
          Name: "Pala",
          Borrower: "Orthodox",
          Quantity: 1,
          Date: "Sep 25 2019"
        },
        { Name: "Speaker", Borrower: "Aklas", Quantity: 1, Date: "Sep 26 2019" }
      ]
    };
  }

  render() {
    return (
      <div className="FacultyItems">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Borrower</th>
              <th scope="col">Quantity</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Items.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Borrower}</td>
                <td>{item.Quantity}</td>
                <td>{item.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Items);
