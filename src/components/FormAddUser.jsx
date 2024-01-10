import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddUser = () => {
  const [nama,setNama]  = useState('');
  const [email,setEmail] = useState('');
  const [password,setpassword] = useState('');
  const [confPassword,setConfPassword] = useState('');
  const [role,setRole] = useState('admin');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        nama: nama,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,

      });

      navigate('/users');
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
        <h1 className='title'>Users</h1>
    <h2 className='subtitle'>Tambah User Baru</h2>
    <div className="card card-is-shadowerss">
        <div className="card-content">
            <div className="content">
            <form onSubmit={saveUser}>
            <p className='has-text-centered'>{msg}</p>
            <div className="field">
                      <label className='label'>Nama Lengkap</label>
                      <div className="control">
                        <input type="text" className='input' value={nama}
                    onChange={(e) => setNama(e.target.value)} placeholder='Nama Lengkap' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Email</label>
                      <div className="control">
                        <input type="text" className='input' value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Passsword</label>
                      <div className="control">
                        <input type="password" className='input' value={password}
                    onChange={(e) => setpassword(e.target.value)} placeholder='********' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Confirm Passsword</label>
                      <div className="control">
                        <input type="password" className='input' value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}  placeholder='********' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Role</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                            <select value={role}
                    onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="siswa">Siswa</option>
                            </select>
                        </div>
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

export default FormAddUser