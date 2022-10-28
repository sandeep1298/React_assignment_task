import React, { Component } from "react";
import Loader from "./Loader";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
    }
   
    componentDidMount() {
        fetch(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        )
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                isLoaded: true,
                items: Object.entries(result["Time Series (5min)"])
              });
            },
            error => {
              this.setState({
                isLoaded: true,
                error: true
              });
            }
          );
      }
    render() { 
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div className="flex-center"><Loader/></div>;
          } else {
        return ( 
            <>
              <div className='container flex-center pt-3'>
                <div className="card">
                  <div className="card-body ">
                    <div className='text-nowrap table-wrapper-scroll-y my-custom-scrollbar overflow table-responsive pt-3'>
                      <table className='table table-striped table-hover table-bordered'>
                        <thead thead className='warning-color top-0'>
                          <tr className="text-center">
                            <th scope="col" className="header text-white"><h5 className="font-weight-bold">DateTime</h5></th>
                            <th scope="col" className="header text-white"><h5 className="font-weight-bold">Open</h5></th>
                            <th scope="col" className="header text-white"><h5 className="font-weight-bold">High</h5></th>
                            <th scope="col" className="header text-white"><h5 className="font-weight-bold">Low</h5></th>
                            <th scope="col" className="header text-white"><h5 className="font-weight-bold">Close</h5></th>
                            <th scope="col" className="header text-white"><h5 className="font-weight-bold">Volume</h5></th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {
                              items.map(([date, item])=>(

                                <tr className="text-center" key={date}>
                                  <td className='cell-0 font-weight-bold'>{date}</td>
                                  <td className='cell-1 font-weight-bold'>{item["1. open"]}</td>
                                  <td className='cell-2 font-weight-bold'>{item["2. high"]}</td>
                                  <td className='cell-3 font-weight-bold'>{item["3. low"]}</td>
                                  <td className='cell-4 font-weight-bold'>{item["4. close"]}</td>
                                  <td className='cell-4 font-weight-bold'>{item["5. volume"]}</td>
                                </tr>
                              ))
                            }
                          </>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
         );
        }
    }
}
 
export default Main;