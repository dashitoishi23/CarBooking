import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import Header from './components/layouts/Header'
import store from './store'
import Dashboard from './components/Dashboard'
import carSearch from './components/carSearch'
import Checkout from './components/checkout'
import Login from './components/Login'
import Payment from './components/payment'
import Register from './components/Register'

if(localStorage.loginJwt){
  setAuthToken(localStorage.loginJwt)
  const decoded = jwt_decode(localStorage.loginJwt)
  store.dispatch(setCurrentUser(decoded))
}

class App extends Component{
render(){
  return(
    <Provider store={store} >
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/carSearch" component={carSearch} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
    </Provider>
  )
}
}

export default App;
