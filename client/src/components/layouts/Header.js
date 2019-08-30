import React from 'react'
import { Link } from 'react-router-dom'

export default ()=>{
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <Link to='/' className="navbar-brand" style={{color:"white"}}>InstaCar</Link>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
    </div>
  </div>
</nav>
</div>
    )
}
