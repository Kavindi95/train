import React, {Component} from 'react';
import axios from 'axios';
import './booktickets.css';

class Booktickets extends Component{
    state = {
        newOrderData: {
            trainName:'',
            numOfTickets: '',
            nic: '',
            totalPrice: '',
            discountPrice: ''
        }
    }
    addOrder(){
        axios.post('/api/orderTickets', this.state.newOrderData).then((response) => {
            this.setState({
                orderTickets: response.data
            })
        });
    }
    showPrice(){
        var train_name = this.state.newOrderData.trainName;
        var num_of_tickets = this.state.newOrderData.numOfTickets;
        var nic = this.state.newOrderData.nic;
        var p = 100;
        var total_price = num_of_tickets*p;
        var dis = total_price/2;
        console.log(train_name);
        console.log(num_of_tickets);
        console.log(nic);
        console.log(total_price);
        console.log(dis);
        this.priceInput.value = total_price;
        this.dispriceInput.value = dis;
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
                    <input type="text" name="numOfTickets"  id="numOfTickets" value={this.state.newOrderData.numOfTickets} onChange={(e) => {
                        let {newOrderData} = this.state;
                        newOrderData.numOfTickets = e.target.value;
                        this.setState({newOrderData})
                     }} />
                    </div>
                    <div className="nic">
                        <lable htmlForm="nic">NIC</lable>
                    <input type="text" name="nic" value={this.state.newOrderData.nic} onChange={(e) => {
                        let {newOrderData} = this.state;
                        newOrderData.nic = e.target.value;
                        this.setState({newOrderData})
                    }} />
                    </div>
                    <div className="showPrice">
                        <button type="button" class="btn btn-info" onClick={this.showPrice.bind(this)}>Show price</button>
                    </div>
                    <div className="price">
                        <lable htmlForm="totalPrice">Total Price</lable>
                        <input type="text" name="totalPrice" id="totalPrice"  ref={ref=> this.priceInput = ref} value={this.state.newOrderData.totalPrice} onChange={(e) => {
                            let {newOrderData} = this.state;
                            newOrderData.totalPrice = e.target.value;
                            this.setState({newOrderData})
                        }} />
                    </div>
                    <div className="discountPrice">
                    <lable htmlForm="discountPrice">Discount Price</lable>
                    <input type="text" name="discountPrice" id="discountPrice" ref={ref=> this.dispriceInput = ref} value={this.state.newOrderData.discountPrice} onChange={(e) => {
                        let {newOrderData} = this.state;
                        newOrderData.discountPrice = e.target.value;
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
