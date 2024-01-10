import React from 'react'
import { NavLink,useNavigate } from "react-router-dom"
import logo from '../images/logo.png'
import { LogOut, reset} from "../features/authSlice"
import { useDispatch,useSelector } from 'react-redux'
const Navbar = () => {

  const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth)

    const Logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");

    }
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation" style={{ backgroundColor: 'blueviolet'}}>
        <div className="navbar-brand">
          <NavLink to="/dashboard"style={{ marginLeft:"50px"}}>
              <img src={logo} width="82" height="52" />
          </NavLink>

              <a href='!#' role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              </a>
          </div>
          <div style={{display: 'flex', flexDirection: 'column',marginLeft:'80px',marginTop:"10px"}}>
              <h1 className='tittle' style={{color:'white',fontWeight:'bold',fontSize:"25px"}}>
                Sistem Informasi Pembayaran SPP
              </h1>
             
            </div>
          
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={Logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
  
      </nav>
    </div>
  )
}

export default Navbar