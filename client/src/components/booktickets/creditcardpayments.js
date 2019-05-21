import React, {Component} from 'react';
import axios from 'axios';
import './booktickets.css';

class Creditcardpayments extends Component{

    constructor(props) {
        super(props);
        this.state = {
            creditPaymentData: {
                cc: '',
                amount: '',
                cvc: '',
                chname: '',
                email: '',
                contnum: '',
                message: ''
            }
        };
    }

    grantCreditPayment = () => {
        var ccn = this.state.creditPaymentData.cc;
        var amount = this.state.creditPaymentData.amount;
        var cvc = this.state.creditPaymentData.cvc;
        var chname = this.state.creditPaymentData.chname;
        var email = this.state.creditPaymentData.email;
        var contnum = this.state.creditPaymentData.contnum;
        var message = "Rs"+amount+".00 has been deducted from your Dialog Mobile Account";

        if (contnum !== "") {
            //send email
            axios.post('/api/form', {
                chname: chname,
                email: email,
                message: message
            })
            //send SMS
            axios.post(`/api/sms/?contnum=${contnum}&message=${message}`)
                .catch(err => {
                    console.error(err)
                })

            console.log("successfully sent");

            //store data in database using API
            axios.post('/api/creditPay', this.state.creditPaymentData).then((response) => {
                this.setState({
                    creditPayments: response.data
                })
            });
        }
    }
    render() {
        return(
            <div>
                <h2>Credit Card Payments</h2>
                <form>
                    <div class="form-group">
                        <label for="cc">Credi Card Number</label>
                        <input type="text" class="form-control" id="cc" name="cc" aria-describedby="emailHelp" placeholder="Enter CC Number"
                        value={this.state.creditPaymentData.cc} onChange={(e) => {
                            let {creditPaymentData} = this.state;
                            creditPaymentData.cc = e.target.value;
                            this.setState({creditPaymentData})
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <input type="text" class="form-control" id="amount" name="amount" aria-describedby="emailHelp" placeholder="Amount"
                        value={this.state.creditPaymentData.amount} onChange={(e) => {
                            let {creditPaymentData} = this.state;
                            creditPaymentData.amount = e.target.value;
                            this.setState({creditPaymentData})
                        }} />
                    </div>
                   <div class="form-group">
                        <label for="cvc">CVC Number</label>
                        <input type="text" class="form-control" id="cvc" name="cvc" aria-describedby="emailHelp" placeholder="Enter CVC Number"
                        value={this.state.creditPaymentData.cvc} onChange={(e) => {
                            let {creditPaymentData} = this.state;
                            creditPaymentData.cvc = e.target.value;
                            this.setState({creditPaymentData})
                        }}/>
                        <small id="cvc" class="form-text text-muted">You should enter four digit number</small>
                    </div>
                    <div class="form-group">
                        <label for="chname">Card Holder's Name</label>
                        <input type="text" class="form-control" id="chname" name="chname" aria-describedby="emailHelp" placeholder="Enter Name"
                        value={this.state.creditPaymentData.chname} onChange={(e) => {
                            let {creditPaymentData} = this.state;
                            creditPaymentData.chname = e.target.value;
                            this.setState({creditPaymentData})
                        }}/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email"
                        value={this.state.creditPaymentData.email} onChange={(e) => {
                            let {creditPaymentData} = this.state;
                            creditPaymentData.email = e.target.value;
                            this.setState({creditPaymentData})
                        }}/>
                    </div>
                    <div class="form-group">
                        <label for="contnum">Contact Number</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" name="contnum" aria-describedby="emailHelp" placeholder="Enter Contact Number"
                        value={this.state.creditPaymentData.contnum} onChange={(e) => {
                            let {creditPaymentData} = this.state;
                            creditPaymentData.contnum = e.target.value;
                            this.setState({creditPaymentData})
                        }}/>
                    </div>
                    <div className="confirmPayment">
                        <label for="lable">.........</label>
                        <button type="button" class="btn btn-info" onClick={this.grantCreditPayment.bind(this)}>Confirm Payment</button>
                    </div>
                </form>
            </div>




    )
    }
}

export default Creditcardpayments;