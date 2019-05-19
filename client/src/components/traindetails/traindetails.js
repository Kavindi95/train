//import React from 'react';
import React, {Component} from 'react';
import axios from 'axios';
import './traindetails.css';
import Booktickets from "../booktickets/booktickets";

//function Traindetails() {
class Traindetails extends Component{
    constructor(props){
        super(props);
        this.state = {showBookTickets: true};
        this.toggleBookTickets = this.toggleBookTickets.bind(this)
        this.state = {
            trainInfo: []
        };
    }

    toggleBookTickets = () => {
        const {showBookTickets} = this.state;
        this.setState({showBookTickets: !showBookTickets})
    }

    componentWillMount() {
        axios.get('/api/trainInfo').then((response) => {
            this.setState({
                trainInfo: response.data
            })
        });
    }
    render()
    {
        let trainInfo = this.state.trainInfo.map((trainInfo) => {
            return(
                <tr class="table-primary" key={trainInfo.id}>
                <td>{trainInfo.name}</td>
                <td>{trainInfo.depStation}</td>
                <td>{trainInfo.depTime}</td>
                <td>{trainInfo.ArrStation}</td>
                <td>{trainInfo.ArrTime}</td>
                <td>{trainInfo.frequency}</td>
                <td>{trainInfo.class}</td>
                <td>{trainInfo.ticketPrice}</td>
                <td><button type="button" class="btn btn-danger disabled" onClick={this.toggleBookTickets}>Book Train</button>
                </td>
                </tr>
            )
        });
    return (
        <div>
            <h2>Train Details</h2>
                <table class="table table-hover">
                    <thead>
                    <tr class="table-secondary">
                        <th scope="col">Name</th>
                        <th scope="col">Depature Station</th>
                        <th scope="col">Depature Time</th>
                        <th scope="col">Ariiving Station</th>
                        <th scope="col">Ariiving Time</th>
                        <th scope="col">Frequency</th>
                        <th scope="col">Class</th>
                        <th scope="col">Ticket Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {trainInfo}
                    </tbody>
                </table>
        {this.state.showBookTickets && <Booktickets />}
    </div>
);
    }
}
export default Traindetails;

