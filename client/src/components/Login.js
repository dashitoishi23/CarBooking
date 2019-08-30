import React,{ Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { custLogin } from '../actions/authActions'

class Login extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push({
                pathname:'/checkout',
                state:{
                    ...this.props.location.state,
                    name:localStorage.getItem('sessionUser'),
                    email:localStorage.getItem('sessionEmail')

                }
            })
        }

        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.custLogin(loginUser)
    }
    render(){
        const { errors } = this.state
        return(
            <div class="jumbotron">
                                        {errors.err && (
                            <div className="alert alert-primary" role="alert">
                            {errors.err}
                           </div>
                        )}
                        <span className="text-danger"></span>
            <h1 class="display-4">Login!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4" />
            <form onSubmit={this.onSubmit}>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name="email" class="form-control"
     id="exampleInputEmail1" aria-describedby="emailHelp"
      placeholder="Enter email" onChange={this.onChange} required />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    {errors.email && (
                            <div className="alert alert-primary" role="alert">
                            {errors.email}
                           </div>
                        )}
                        <span className="text-danger"></span>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password"
     class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.onChange} required />
                            {errors.password && (
                            <div className="alert alert-primary" role="alert">
                            {errors.password}
                           </div>
                        )}
                        <span className="text-danger"></span>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
  <Link to={{
      pathname:'/register',
      state:{
          ...this.props.location.state
      }
  }}>New User?Register Here</Link>
</form>
          </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    errors: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ custLogin })(Login);