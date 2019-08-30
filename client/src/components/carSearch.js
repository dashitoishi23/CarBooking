import React, {Component} from 'react'
import '../styles/styles.css'
import axios from 'axios'

class carSearch extends Component{
    constructor(){
        super();
        this.state={
          driverPack : "15",
          lang: "English",
          car: "Audi"
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e){
        e.preventDefault()

        const driverDetails = {
          driverPack: this.state.driverPack,
          lang: this.state.lang,
          car: this.state.car,
          ...this.props.location.state
        }
        axios.post('http://localhost:5000/api/users/carSearch',driverDetails)
        .then(res=>{
          this.props.history.push({
            pathname:'/checkout',
            state:{
              ...driverDetails,
              cost:res.data.cost
            }
          })
        })

    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
    <label for="exampleFormControlSelect1">Driver Package</label>
    <select className="form-control" id="exampleFormControlSelect1" name="driverPack" onChange={this.onChange}>
      <option selected value={parseInt("15")}>Rs.15/km (Normal)</option>
      <option value={parseInt("18")}>Rs.18/km (White dressed)</option>
      <option value={parseInt("25")}>Rs.25/km (White dressed, chaffeaur etiquettes)</option>
    </select>
  </div>
  <div className="form-group">
    <label for="exampleFormControlSelect2">Language of driver</label>
    <select className="form-control" id="exampleFormControlSelect2" name="lang" onChange={this.onChange}>
      <option selected>English</option>
      <option>Hindi</option>
      <option>Kannada</option>
    </select>
  </div>
  <div className="form-group">
    <label for="exampleFormControlSelect3">Select Car Manufacturer</label>
    <select className="form-control" id="exampleFormControlSelect3" name="car" onChange={this.onChange}>
      <option selected>Audi</option>
      <option>BMW</option>
      <option>Merecedes</option>
      <option>Non-luxury</option>
    </select>
  </div>
  <button type="submit" className="btn btn-primary">Proceed to checkout</button>
</form>
            </div>
        )
    }
}
export default carSearch