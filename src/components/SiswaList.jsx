import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const SiswaList = () => {
    const [SiswaList, setSiswaList] = useState([]);
    const {user} = useSelector((state) => state.auth)
    useEffect(() => {
        getSiswaList();
    }, []);
  
    const getSiswaList = async () => {
      const response = await axios.get('http://localhost:5000/siswa')
      setSiswaList(response.data)
    }
  
    const deleteUser = async (userId) => {
      await axios.delete(`http://localhost:5000/siswa/${userId}`);
      getSiswaList();
    }
  return (
    <div>
    <h1 className='title'>Siswa</h1>
    <h2 className='subtitle'>List Siswa</h2>
    <table className='table is-striped is-fullwidth'>
        <thead>
            <tr >
                <th>No</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Nomor Induk</th>
                <th>Kelas</th>
                <th>Tanggal Lahir</th>
                <th>Alamat</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>
            {SiswaList.map((siswa, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{siswa.user.nama}</td>
                <td>{siswa.user.email}</td>
                <td>{siswa.nomor_induk}</td>
                <td>{siswa.kelas}</td>
                <td>{siswa.tgl_lahir}</td>
                <td>{siswa.alamat}</td>
                <td><Link to={`edit/${siswa.id}`} className='button is-small is-info mr-2'>Edit</Link>
                <button onClick={()=> deleteUser(siswa.id)} className='button is-small is-danger'>Hapus</button>
                </td>
                
            </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default SiswaList