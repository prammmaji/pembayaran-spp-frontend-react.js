import React from 'react'
import {NavLink,useNavigate} from "react-router-dom"
import { IoPerson,IoPricetag,IoLogOut,IoHome,IoWalletSharp } from "react-icons/io5"
import { LogOut, reset} from "../features/authSlice"
import { useDispatch,useSelector } from 'react-redux'


const Sidebar = () => {
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
        <aside className="menu has-shadow ml-2">
        <p className="menu-label">
            General
        </p>
        <ul className="menu-list">
            <li><NavLink to={"/dashboard"}><IoHome/>Dashboard</NavLink></li>
            <li><NavLink to={"/pembayaran"}><IoPricetag/>Pembayaran</NavLink></li>
        </ul>
        {user && user.role === "admin" && (
            <div>
            <p className="menu-label">
            Admin
        </p>
        <ul className="menu-list">
        
        <li><NavLink to={"/users"}><IoPerson/>Users</NavLink></li>
        <li><NavLink to={"/siswa"}><IoPerson/>Siswa</NavLink></li>
        <li><NavLink to={"/tagihan"}><IoWalletSharp/>Tagihan</NavLink></li>
        </ul>
            </div>
        )}
        
        <p className="menu-label">
            Settings
        </p>
        <ul className="menu-list">
        {user && user.role === "siswa" && (
            <li><NavLink to={"/siswa/profile"}><IoPerson/> Profil</NavLink></li>
            )}
            <li><button onClick={Logout} className='button is-white'><IoLogOut/>Log out</button></li>
        </ul>
</aside>
    </div>
  )
}

export default Sidebar