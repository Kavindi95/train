import React, {Component} from 'react';
import axios from 'axios';
import './booktickets.css';

class Booktickets extends Component{
    state = {
        newOrderData: {
            trainName:'',
            numOfTickets: ''
        }
    }
    addOrder(){
        axios.post('/api/orderTickets', this.state.newOrderData).then((response) => {
            this.setState({
                orderTickets: response.data
            })
        });
    }
    render()
    {
        return (
            <div className="wrapper">
             <div className="form-wrapper">
              <h2>Book Tickets</h2>
                <form>
                    <div className="trainName">
                        <lable htmlForm="trainName">Train Name</lable>
                            <input type="text" name="trainName" value={this.state.newOrderData.trainName} onChange={(e) => {
                                let {newOrderData} = this.state;
                                newOrderData.trainName = e.target.value;
                                this.setState({newOrderData})
                            }} />
                    </div>
                    <div className="numOfTickets">
                        <lable htmlForm="numOfTickets">Number of Tickets</lable>
                    <input type="text" name="numOfTickets" value={this.state.newOrderData.numOfTickets} onChange={(e) => {
                        let {newOrderData} = this.state;
                        newOrderData.numOfTickets = e.target.value;
                        this.setState({newOrderData})
                     }} />
                    </div>
                    <div className="submitButton">
                        <button type="submit" class="btn btn-success disabled" onClick={this.addOrder.bind(this)}>Book Ticket</button>
                    </div>
                </form>
             </div>
            </div>
        );
    }
}

export default Booktickets;
