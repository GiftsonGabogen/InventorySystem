import React, { Component } from "react";
import { connect } from "react-redux";
import { UnMountAlertAction } from "../Actions/UnMountActions";
import shoppingBag from "./Images/shopping-bag.png";
import piggyBank from "./Images/piggy-bank.png";

function mapStateToProps(state) {
  return {
    items: state.items,
    sales: state.sales
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MonthSaleDisplay: 0
    };
  }
  componentDidMount() {
    let MonthProfit = 0;
    this.props.sales.MonthSale.map((sale, i) => {
      return (MonthProfit =
        MonthProfit +
        (sale.Quantity * sale.ItemID.SellingPrice - (sale.Quantity * sale.ItemID.Price) / sale.ItemID.Quantity));
    });
    this.setState({
      MonthSaleDisplay: MonthProfit
    });
  }

  componentWillUnmount() {
    this.props.UnMountAlertAction();
  }
  render() {
    console.log(this.props.sales.MonthSale);
    return (
      <div className="Overview">
        <div className="card">
          <div className="card-header">Inventory Overview</div>
          <div className="card-body">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <img src={shoppingBag} className="w-50" alt="" />
                  <h2>{this.props.items.items.length}</h2>
                  <h2>Items</h2>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <img src={piggyBank} className="w-50" alt="" />
                  <h2>{this.state.MonthSaleDisplay}</h2>
                  <h2>Sales</h2>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <img src="./Images/N/A.png" className="w-50" alt="" />
                  <h2>N/A</h2>
                  <h2>N/A</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { UnMountAlertAction })(Home);
