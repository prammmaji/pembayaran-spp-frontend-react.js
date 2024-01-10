import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 


const ProfilePage = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { user } = useSelector((state) => state.auth);
  const id = user && user.uuid;

  useEffect(() => {
    const getUserByID = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setNama(response.data.nama);
        setEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
  
    if (id) {
      getUserByID(id);
    }
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
     const  res = await axios.patch(`http://localhost:5000/users/${id}`, {
        nama: nama,
        email: email,
        password: password,
        confPassword: confPassword
      });

      setMsg(res.data.msg);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Profile</h1>
      <h2 className='subtitle'>Setting Profil</h2>
      <Link to={`#`} className='button is-small is-info mr-2'>Akun</Link>
      <Link to={`datadiri`} className='button is-small is-info mr-2 mb-2'>Data Diri</Link>
      <div className="card card-is-shadowerss">
        <div className="card-content">
            <div className="content">
            <form onSubmit={updateUser}>
            <p className='has-text-centered'>{msg}</p>
            <div className="field">
                      <label className='label'>Nama Lengkap</label>
                      <div className="control">
                        <input type="text" className='input' value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Nama Lengkap' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Email</label>
                      <div className="control">
                        <input type="text" className='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Passsword</label>
                      <div className="control">
                        <input type="password" className='input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Confirm Passsword</label>
                      <div className="control">
                        <input type="password" className='input' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='********' />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button className="button is-success is-fullwidth">Simpan</button>
                    </div>
                  </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ProfilePage