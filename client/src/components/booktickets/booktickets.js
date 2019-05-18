import React, {Component} from 'react';
import axios from 'axios';
import './booktickets.css';

class Booktickets extends Component{
    constructor(props) {
        super(props);
        this.state = {
            trainInfo: [],
            user: [],
            newOrderData: {
                trainName:'',
                numOfTickets: '',
                nic: '',
                totalPrice: '',
                discountPrice: ''
            }
        };
    }
    componentWillMount() {
        axios.get('/api/trainInfo').then((response) => {
            this.setState({
                trainInfo: response.data
            })
        });

        axios.get('/api/user').then((response) => {
            this.setState({
                user: response.data
            })
        });
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
        var nic = this.state.newOrderData.nic;
        var num_of_tickets = this.state.newOrderData.numOfTickets;
        var discount = 1/2; //discount is 50% if government agent

        //get train Info
        let trainInfo = this.state.trainInfo;
        var data = trainInfo.filter(trainInfo => trainInfo.name === train_name)
        var price = data[0];
        var ticketPrice = price.ticketPrice;

        //get price
        var totalPrice = ticketPrice*num_of_tickets;

        //get user data
        let user = this.state.user;
        var udata = user.filter(user => user.nic === nic)
        var gov = udata[0];
        var govAgent = gov.govAgent;

        if(govAgent === "1"){
            var discountPrice = totalPrice * discount;
        }
        console.log(discountPrice);

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
    <input type="text" name="totalPrice" id="totalPrice" value={this.state.newOrderData.totalPrice} onChange={(e) => {
        let {newOrderData} = this.state;
        newOrderData.totalPrice = e.target.value;
        this.setState({newOrderData})
    }} />
    </div>
    <div className="discountPrice">
        <lable htmlForm="discountPrice">Discount Price</lable>
    <input type="text" name="discountPrice" id="discountPrice" value={this.state.newOrderData.discountPrice} onChange={(e) => {
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
