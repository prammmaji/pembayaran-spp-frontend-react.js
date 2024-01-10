import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
const ListBelumBayar = () => {
    const [pembayaranList, setPembayaranList] = useState([]);
    const [tagihanNama, setTagihanNama] = useState([]);
    const [nominal,setNominal] = useState('')
    const {id} = useParams()
    const { user } = useSelector((state) => state.auth);
    

    useEffect(() => {
      getPembayaranList();
      getTagihanList();
    }, []);
  
    const getPembayaranList = async () => {
      const response = await axios.get(`http://localhost:5000/belumBayar/${id}`);
      setPembayaranList(response.data);
    } 
    const getTagihanList = async () => {
        const response = await axios.get(`http://localhost:5000/tagihan/${id}`);
        setTagihanNama(response.data.nama_tagihan);
        setNominal(response.data.nominal);
    }
 

  
    return (
      <div>
        <h1 className='title'>Pembayaran</h1>
        <h2 className='subtitle'>List Belum Bayar</h2>
        <Link to='/pembayaran' className='button is-primary mb-5'>List Semua Pembayaran</Link>
        <Link to='/pembayaran/belum-bayar' className='button is-primary mb-5 ml-5'>List Siswa Belum Bayar </Link>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Siswa</th>
              <th>Nomor Induk</th>
              <th>Kelas</th>
              <th>Nama Tagihan</th>
              <th>Nominal</th>
            </tr>
          </thead>
          <tbody>
          {pembayaranList.map((pembayaran, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pembayaran.nama}</td>
                <td>{pembayaran.nomor_induk}</td>
                <td>{pembayaran.kelas}</td>
                <td>{tagihanNama}</td>
                <td>{nominal}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default ListBelumBayar