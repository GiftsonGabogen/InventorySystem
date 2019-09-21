import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import SearchBar from "../../Comps/SearchBar";
import moment from "moment";

function mapStateToProps(state) {
  return {
    sales: state.sales,
    items: state.items
  };
}

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Sales: this.props.sales.Sales
    };
  }
  componentDidMount() { }

  onSearch = (Cat, Nam) => {
    const Name = Nam.toLowerCase();
    let Sales;
    if (Cat === "All" && Name === "") {
      Sales = this.props.sales.Sales;
    } else if (Cat === "All" && Name !== "") {
      Sales = this.props.sales.Sales.filter(Sale =>
        Sale.ItemName.toLowerCase().includes(Name)
      );
    } else if (Cat !== "All" && Name === "") {
      Sales = this.props.sales.Sales.filter(
        Sale => Sale.Category.toLowerCase() === Cat.toLowerCase()
      );
    } else {
      var preSales = this.props.sales.Sales.filter(
        Sale => Sale.Category.toLowerCase() === Cat.toLowerCase()
      );
      Sales = preSales.filter(Sale => Sale.ItemName.toLowerCase().includes(Name));
    }

    this.setState({
      Sales
    });
  };

  render() {
    return (<div className="Sales" >
      <SearchBar onSearch={
        this.onSearch
      }
        Categories={
          this.props.items.categories
        }
        date={
          true
        }
      /> <table className="table table-striped table-sm" >
        <thead >
          <tr >
            <th scope="col" > # </th> <th scope="col" > Name </th> <th scope="col" > Category </th> <th scope="col" > Quantity </th> <th scope="col" > Total Price </th> <th scope="col" > Date </th>
          </tr> </thead> <tbody> {
            this.state.Sales.map((Sale, i) => (<tr key={
              Sale._id
            } >
              <th scope="row" > {
                i + 1
              } </th> <td > {
                Sale.ItemName
              } </td> <td > {
                Sale.Category
              } </td> <td > {
                Sale.Quantity
              } </td> <td > {
                Sale.Quantity * Sale.PricePerUnit
              } </td> <td className="Date"> {
                moment(Sale.Date)
                  .format("ddd MMM/Do/YYYY")
                  .toString()
              } </td> </tr>
            ))
          } </tbody> </table> </div>
    );
  }
}

export default connect(mapStateToProps)(Sales);
