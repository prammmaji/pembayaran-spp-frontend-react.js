import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const FormEditUser = () => {
  const [nama,setNama] = useState('');
  const [email,setEmail] = useState('');
  const [password,setpassword] = useState('');
  const [confPassword,setConfPassword] = useState('');
  const [role,setRole] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(()=>{
    const getUserByID = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setNama(response.data.nama);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
        setMsg(error.response.data.msg)
        console.log(id);
      }
      }
    }
    getUserByID()
  },[id])

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        nama: nama,
        email: email,
        password:password,
        confPassword:confPassword,
        role:role
      })

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
    <h2 className='subtitle'>Edit User</h2>
    <div className="card card-is-shadowless">
        <div className="card-content">
            <div className="content">
            <form onSubmit={updateUser}>
            <p className='has-text-centered'>{msg}</p>
            <div className="field">
                      <label className='label'>Nama Lengkap</label>
                      <div className="control">
                        <input type="text" className='input' value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Email' />
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
                        <input type="password" className='input' onChange={(e) => setpassword(e.target.value)} placeholder='********' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Confirm Passsword</label>
                      <div className="control">
                        <input type="password" className='input' onChange={(e) => setConfPassword(e.target.value)} placeholder='********' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Role</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="siswa">Siswa</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button className="button is-success is-fullwidth">Update</button>
                    </div>
                  </form>
            </div>
        </div>
        </div>
    
    </div>
  )
}

export default FormEditUser