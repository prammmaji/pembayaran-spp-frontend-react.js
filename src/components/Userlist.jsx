import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
const Userlist = () => {
    
  const [userList, setUserList] = useState([]);
  const {user} = useSelector((state) => state.auth)
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = await axios.get('http://localhost:5000/users')
       setUserList(response.data)
  }

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUserList();
  }
  return (
    <div>
    <h1 className='title'>User</h1>
    <h2 className='subtitle'>List User</h2>
    <Link to='/users/add' className='button is-primary mb-5'>Tambah User</Link>
    <table className='table is-striped is-fullwidth'>
        <thead>
            <tr >
                <th>No</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>
            {userList.map((user, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{user.nama}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><Link to={`edit/${user.uuid}`} className='button is-small is-info mr-2'>Edit</Link>
                <button onClick={()=> deleteUser(user.uuid)} className='button is-small is-danger'>Hapus</button>
                </td>
                
            </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default Userlist