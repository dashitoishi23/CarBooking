import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import axios from 'axios'


import "react-datepicker/dist/react-datepicker.css";


class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            from: 'Bangalore',
            to: '',
            fromDate: new Date(),
            toDate:'',
            travelMode:'Round Trip',
            numCities:1,
            cities:[],
            secCity:'',
            thirCity:'',
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onMult = this.onMult.bind(this)
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
    }
    onMult = val =>{
      let cit = []
      cit.append(val)
      this.setState({cities:cit})
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleFromDateChange(date) {
        this.setState({
          fromDate: date
        });
      }
    handleToDateChange(date) {
        this.setState({
            toDate: date
        });
    }
    onSubmit(e){
        e.preventDefault();


        const carSearch = {
            from: 'Bangalore',
            to: this.state.to,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            travelMode: this.state.travelMode,
            secCity:this.state.secCity,
            thirCity:this.state.thirCity,
        }
        axios.post('http://localhost:5000/api/users/validCheck',carSearch)
        .then(res=>{
            console.log(res.data)
            if(res.data.err1||res.data.err2){
                this.setState({errors:res.data})
            }
            else{
                this.props.history.push({
                    pathname: '/carSearch',
                    state: {...carSearch}
                })
            }
        })
        // const diffTime = this.state.toDate - this.state.fromDate;
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // if(diffDays<0){
        //     err.dateErr = "To Date has to be AFTER From Date"
        //     this.setState({errors:err})
        // }
        // if(this.state.travelMode==='Multi City'&&(this.state.to!==this.state.thirCity)||(this.state.from===this.state.thirCity)){
        //     err.destErr = "Destination mismatch! From and third city cannot be different OR To and third city can't be same "
        //     this.setState({errors:err})
        // }
        // else if(err==={}){
        //     this.props.history.push({
        //         pathname: '/carOptions',
        //         state:{ ...carSearch }
        //     })



        
    }
    render(){
        return(
            <div>
            <div className="container">
            <form onSubmit={this.onSubmit}>
  <div className="form-row">
    <div className="form-group col-md-3">
      <label for="inputEmail4">From</label>
      <input type="text" className="form-control" id="inputEmail4" value="Bangalore" disabled onChange={this.onChange} required/>
    </div>
    {this.state.travelMode==="Airport Package"? <div className="form-group col-md-3">
      <label for="inputPassword4">To</label>
      <input type="text" className="form-control" name="to" id="inputPassword4" disabled placeholder="To" onChange={this.onChange} required/>
    </div>:    <div className="form-group col-md-3">
      <label for="inputPassword4">To</label>
      <input type="text" className="form-control" name="to" id="inputPassword4" placeholder="To" onChange={this.onChange} required/>
    </div>}
    <div className="form-group col-md-3" >
      <label for="fromDate">From Date</label>
      <DatePicker
        selected={this.state.fromDate}
        onChange={this.handleFromDateChange}
        value = {this.state.fromDate}
        required
      />
    </div>
    <div className="form-group col-md-3" >
      <label for="toDate">To Date</label>
      <DatePicker
        selected={this.state.toDate}
        onChange={this.handleToDateChange}
        value={this.state.toDate}
        required
      />
                              {this.state.errors.err1 && (
                            <div className="alert alert-primary" role="alert">
                           {this.state.errors.err1}
                          </div>
                        )}
                    <span className="text-danger"></span>
    </div>

  </div>
  {this.state.travelMode==='Multi City'?
              <div className="form-group">
              <div className="form-group col-md-6">
              <input type="text" className="form-control"
               name="secCity" onChange={this.onChange} id="inputEmail4" placeholder="Add City" required/>
            </div>
            <div className="form-group col-md-6">
              <input type="text" className="form-control"
              name="thirCity" onChange={this.onChange} id="inputPassword4" placeholder="Add City" required/>
            </div>
    </div>:null}
    {this.state.errors.err2 && (
                            <div className="alert alert-primary" role="alert">
                           {this.state.errors.err2}
                          </div>
                        )}
                    <span className="text-danger"></span>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputState">Travel Mode</label>
      <select id="inputState" name="travelMode" className="form-control" onChange={this.onChange} required>
        <option selected>Round Trip</option>
        <option>One Way</option>
        <option>Multi City</option>
        <option>Airport Package</option>
      </select>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Search</button>
</form>
</div>
</div>
        )
    }
}

export default Dashboard