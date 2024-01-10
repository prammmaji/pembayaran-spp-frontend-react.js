import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 

const TagihanList = () => {
    const [TagihanList, setTagihanList] = useState([]);
    
    useEffect(() => {
        getTagihanList();
    }, []);
  
    const getTagihanList = async () => {
      const response = await axios.get('http://localhost:5000/tagihan/all')
      setTagihanList(response.data)
    }
  
    const deleteTagihan = async (id) => {
      await axios.delete(`http://localhost:5000/tagihan/${id}`);
      getTagihanList();
    }
  return (
    <div>
    <h1 className='title'>Tagihan</h1>
    <h2 className='subtitle'>List Tagihan</h2>
    <Link to='/tagihan/add' className='button is-primary mb-5'>Tambah Tagihan</Link>
    <table className='table is-striped is-fullwidth'>
        <thead>
            <tr >
                <th>No</th>
                <th>Tahun Ajaran</th>
                <th>Nama Tagihan</th>
                <th>Nominal</th>
                <th>Status Tagihan</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>
            {TagihanList.map((tagihan, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{tagihan.tahun_ajaran}</td>
                <td>{tagihan.nama_tagihan}</td>
                <td>{tagihan.nominal}</td>
                <td>{tagihan.status}</td>
                <td><Link to={`edit/${tagihan.id}`} className='button is-small is-info mr-2'>Edit</Link>
                <button onClick={()=> deleteTagihan(tagihan.id)} className='button is-small is-danger'>Hapus</button>
                </td>
                
            </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default TagihanList