import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser,reset,LogOut} from "../features/authSlice"
import { useSelector } from 'react-redux'
import logo from '../images/logo.png'
import backgroundImage from '../images/background.jpeg'

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,isError,isSuccess,isLoading,message} = useSelector(state => state.auth);

    useEffect(()=>{
      if(user|| isSuccess){
        navigate("/dashboard");
      }
      dispatch(reset())
    },[user,isSuccess,dispatch,navigate])

    const Auth = (e)=>{
      e.preventDefault();
      dispatch(LoginUser({email,password}));
    }

  return (
    <div>
        <section className="hero"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
        }}>
          <div className="hero-body">
            <div className="container">
               <div className='columns' style={{ alignItems: 'center' }}>
                    <div className='column is-1' style={{ alignItems: 'center', marginLeft:"50px",marginRight:'-100px'}}>
                    <img src={logo} width="112" height="45"/>
                    </div>
                    <div className='column'>
                    <div style={{display: 'flex', flexDirection: 'column',marginLeft:'100px'}}>
                        <h1 className='tittle' style={{color:'white',fontWeight:'bold', fontSize:'50px'}}>
                          Sistem Informasi Pembayaran SPP
                        </h1>
                        <h2 className='subtitle' style={{color:'white'}}>
                        SMP Muhammadiyah 2 JATINOM
                        </h2>
                  </div>
                    </div>
                  </div>
              <div className="columns">
                <div className="column is-4">
                  <form onSubmit={ Auth } className='box'>
                  
                  {isError && <p className='has-text-centered'>{message}</p>}
                  <h1 className='title is-2'>Sign In</h1>
                    <div className="field">
                      <label className='label'>Email</label>
                      <div className="control">
                        <input type="text" className='input' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Passsword</label>
                      <div className="control">
                        <input type="password" className='input' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='********' />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button type='submit' className="button is-success is-fullwidth">{ isLoading ? "Loading..." : "Login"}</button>
                    </div>
                  </form>
                </div>
                <div className='column'>
                  <div className='box'>
                    <h1 style={{fontWeight:'bold', fontSize:'25px'}}>PETUNJUK PEMBAYARAN SPP</h1>
                    <p>1. Login Pada Halaman Website dengan Email & Password yang telah diberikan.</p>
                    <p>2. Isi Data Diri terlebih Dahulu di Menu Profil</p>
                    <p>3. Cek Tagihan yang ada pada menu Dashboard</p>
                    <p>4. Pilih Tagihan yang akan dibayar, lalu klik tombol Bayar</p>
                    <p>5. Pilih Tanggal Pembayaran & Upload Bukti Pembayaran</p>
                    <p>6. Klik Tombol Simpan</p>
                    <p>7. Tunggu Admin menvalidasi pembayaran anda. Anda dapat memantau status Pembayaran anda di Menu Pembayaran</p>
                    <p>8. Selesai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Login