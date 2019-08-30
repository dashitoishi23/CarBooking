import React,{Component} from 'react'
import axios from 'axios'

class Register extends Component{
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            registered:false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const regUser = {
            ...this.state
        }
        axios.post('http://localhost:5000/api/users/register',regUser)
        .then(res=>{
            this.setState({registered:true})
        })
        .catch(err=>{
            this.setState({errors:err.response.data})
        })
            this.props.history.push({
                pathname:'/login',
                state:{
                    ...this.props.location.state
                }
            })
        

    }
    render(){
        return(
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1"
                name="email" onChange={this.onChange}
                 aria-describedby="emailHelp" placeholder="Enter email" required />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword2">Name</label>
                <input type="text" class="form-control"
                name="name"
                onChange={this.onChange}
                 id="exampleInputPassword2" placeholder="Password" required/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control"
                name="password"
                onChange={this.onChange}
                 id="exampleInputPassword1" placeholder="Password" required/>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            </form>
        )
    }
}
export default Register