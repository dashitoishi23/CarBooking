import React,{ Component } from 'react'
import 'rc-time-picker/assets/index.css';
import {Link} from 'react-router-dom'
import moment from 'moment';

import TimePicker from 'rc-time-picker';

const showSecond = true;

class Checkout extends Component{
    constructor(){
        super();
        this.state={
        }
        this.vars={

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        this.setState({...this.props.location.state})
    }
    onChange(e){
             this.vars = {[e.target.name]:e.target.value};
    }
    onSubmit(e){
        e.preventDefault()
        this.setState({...this.props.location.state,...this.vars})
        console.log(this.vars)
        this.props.history.push({
            pathname:'/payment',
            state:{
                cost:this.state.cost
            }
        })

    }
    render(){
        return(
            <div>
                {localStorage.loginJwt?
                    <div class="jumbotron">
                    <h1 class="display-4">Hello {this.state.name}</h1>
                    <p class="lead">Here are your booking details</p>
                    <hr class="my-4" />
                    <p>Your Email: {this.state.email}</p>
                    <p>From: Bangalore</p>
                    <p>To: {this.state.to} </p>
                    <p>Driver Package : Rs. {this.state.driverPack}/km</p>
                    <p>Trip Package: {this.state.travelMode}</p>
                    <p>Car: {this.state.car}</p>
                    <p>Driver Language: {this.state.lang}</p>
                    <p>Total Cost:Rs. {this.state.cost}</p>
                    <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Pickup Address</label>
                        <textarea class="form-control" name="address" id="exampleFormControlTextarea1" rows="3"
                        onChange={this.onChange}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Pickup Time</label>
                        <TimePicker
                            name="time"
                            style={{ width: 100 }}
                            showSecond={showSecond}
                            defaultValue={moment()}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Continue to Pay</button>
                    </form>
                  </div>:<div class="jumbotron">
                    <h1 class="display-4">Please Login First!</h1>
                    <hr class="my-4" />
                    <Link to={{
                        pathname:'/login',
                        state:{
                            ...this.props.location.state
                        }
                    }}>LOGIN</Link>
                  </div>}
            </div>
        )
    }
}

export default Checkout