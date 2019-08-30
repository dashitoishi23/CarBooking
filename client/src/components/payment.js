import React,{ Component } from 'react'

class Payment extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount(){
        this.setState({...this.props.location.state})
        localStorage.removeItem("loginJwt")
        localStorage.removeItem("sessionUser")
        localStorage.removeItem("sessionEmail")
    }
    render(){
        return(
            <h3>Pay Rs. {this.state.cost} in cash to your driver upon arrival!</h3>
        )
    }
}
export default Payment