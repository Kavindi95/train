//import React from 'react';
import React, {Component} from 'react';
import './traindetails.css';

//function Traindetails() {
class Traindetails extends Component{
    constructor()
    {
        super();
        this.state = {
            traindetails: []
        }
    }
    componentDidMount()
    {
        fetch('/api/trainInfo')
            .then(res => res.json())
            .then(traindetails => this.setState({traindetails}, () => console.log('Customers fetched....', traindetails)));
    }
    render()
    {
    return (
        <div>
            <h2>Train Details</h2>
            <ul>
    {this.state.traindetails.map(traindetails =>
            <li key = {traindetails.id}>{traindetails.name} {traindetails.depStation}</li>
        )}
            </ul>
    </div>
);
    }
}

export default Traindetails;
