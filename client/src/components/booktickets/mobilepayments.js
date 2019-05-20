import React, {Component} from 'react';
import axios from 'axios';

class MobilePayments extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mobilePaymentData: {
                contnum: '',
                pin: '',
                amount: ''
            }
        };
    }

    grantMobilePayment = () => {
        var contnum = this.state.mobilePaymentData.contnum;
        var pin = this.state.mobilePaymentData.pin;
        var amount = this.state.mobilePaymentData.amount;
        var message = "Rs"+amount+".00 has been deducted from your Dialog Mobile Account";

        //send SMS
        axios.post(`/api/sms/?contnum=${contnum}&message=${message}`)
            .catch(err=>{console.error(err)})

    }

    render() {
        return(
            <div>
                <h2>Mobile Payments</h2>
                <form>
                    <div class="form-group">
                        <label for="contnum">Contact Number</label>
                        <input type="text" class="form-control" id="contnum" name="contnum" aria-describedby="emailHelp" placeholder="Enter Contact Number"
                        value={this.state.mobilePaymentData.contnum} onChange={(e) => {
                            let {mobilePaymentData} = this.state;
                            mobilePaymentData.contnum = e.target.value;
                            this.setState({mobilePaymentData})
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="pin">Pin Number</label>
                        <input type="text" class="form-control" id="pin" name="pin" aria-describedby="emailHelp" placeholder="Enter Pin Number"
                        value={this.state.mobilePaymentData.pin} onChange={(e) => {
                            let {mobilePaymentData} = this.state;
                            mobilePaymentData.pin = e.target.value;
                            this.setState({mobilePaymentData})
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <input type="text" class="form-control" id="amount" name="amount" aria-describedby="emailHelp" placeholder="Enter Amount"
                        value={this.state.mobilePaymentData.amount} onChange={(e) => {
                            let {mobilePaymentData} = this.state;
                            mobilePaymentData.amount = e.target.value;
                            this.setState({mobilePaymentData})
                        }} />
                    </div>
                    <div>
                        <button type="button" class="btn btn-info" onClick={this.grantMobilePayment.bind(this)}>Submit</button>
                    </div>
                </form>
            </div>

    )
    }
}

export default MobilePayments;