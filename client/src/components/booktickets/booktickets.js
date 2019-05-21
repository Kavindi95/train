import React, {Component} from 'react';
import axios from 'axios';
import './booktickets.css';
import Creditcardpayments from './creditcardpayments';
import MobilePayments from './mobilepayments';

class Booktickets extends Component{
    constructor(props) {
        super(props);
        this.state = {showCreditPay: true};
        this.state = {showMobilePay: true};
        this.toggleCreditPay = this.toggleCreditPay.bind(this)
        this.toggleMobilePay = this.toggleMobilePay.bind(this)
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
    toggleCreditPay = () => {
        const {showCreditPay} = this.state;
        this.setState({showCreditPay: !showCreditPay})
    }
    toggleMobilePay = () => {
        const {showMobilePay} = this.state;
        this.setState({showMobilePay: !showMobilePay})
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

        if(nic !== "") {
            //get user data
            let user = this.state.user;
            var udata = user.filter(user => user.nic === nic)
            var gov = udata[0];
            var govAgent = gov.govAgent;

            if (govAgent === "1") {
                var discountPrice = totalPrice * discount;
            } else {
                discountPrice = "0";
            }
        }
        //set value into totalPrice and discountPrice in newOrderData
        let newOrderData = Object.assign({}, this.state.newOrderData);    //creating copy of object
        newOrderData.totalPrice = totalPrice;                        //updating value
        newOrderData.discountPrice = discountPrice;
        this.setState({newOrderData});

        //add into mongodb
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
                <lable htmlForm="govAgent">Government Agent</lable>
                <input type="checkbox" id="reveal-email" role="button" />
            <div className="trainName">
                <lable htmlForm="trainName">Train Name</lable>
                <input type="text" name="trainName" value={this.state.newOrderData.trainName} onChange={(e) => {
                    let {newOrderData} = this.state;
                    newOrderData.trainName = e.target.value;
                    this.setState({newOrderData})
                }} />
                 <small id="trainName" class="form-text text-muted">You should Enter Train Name as in List</small>
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
                <button type="button" class="btn btn-info" onClick={this.addOrder.bind(this)}>Confirm Reservation</button>
            </div>
            <div className="submitButton">
                <button type="button" class="btn btn-primary" onClick={this.toggleCreditPay}>Credit Card Payments</button>
            </div>
            <div className="submitButton">
                <button type="button" class="btn btn-primary" onClick={this.toggleMobilePay}>Mobile Payments</button>
            </div>
            </form>
            {this.state.showCreditPay && <Creditcardpayments />}
            {this.state.showMobilePay && <MobilePayments />}
            </div>
    </div>
    );
    }
}

export default Booktickets;
