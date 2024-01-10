import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const Pembayaranlist = () => {
  const [pembayaranList, setPembayaranList] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getPembayaranList();
  }, []);

  const getPembayaranList = async () => {
    const response = await axios.get('http://localhost:5000/pembayaran');
    setPembayaranList(response.data);
  }

  const deletePembayaran = async (pembayaranId) => {
    await axios.delete(`http://localhost:5000/pembayaran/${pembayaranId}`);
    getPembayaranList();
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPembayaranList = pembayaranList.filter((pembayaran) => {
    const lowercaseSearch = search.toLowerCase() || '';
    const namaSiswa = pembayaran.user.nama.toLowerCase() || '';
    const nomorInduk = pembayaran.user?.siswa?.nomor_induk?.toString().toLowerCase() || '';
    const kelas = pembayaran.user?.siswa?.kelas.toLowerCase() || '';
    const namaTagihan = pembayaran.tagihan.nama_tagihan.toLowerCase() || '';
    
    return (
      namaSiswa.includes(lowercaseSearch) ||
      nomorInduk.includes(lowercaseSearch) ||
      kelas.includes(lowercaseSearch) ||
      namaTagihan.includes(lowercaseSearch)
    );
  });

  return (
    <div>
      <h1 className='title'>Pembayaran</h1>
      <h2 className='subtitle'>List Pembayaran</h2>
      <Link to='/pembayaran' className='button is-primary mb-5'>List Semua Pembayaran</Link>
      <Link to='/pembayaran/belum-bayar' className='button is-primary mb-5 ml-5'>List Siswa Belum Bayar </Link>
      <div className='field'>
        <div className='control'>
          <input
            className='input'
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Cari...'
          />
        </div>
      </div>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Siswa</th>
            <th>Nomor Induk</th>
            <th>Kelas</th>
            <th>Nama Tagihan</th>
            <th>Nominal</th>
            <th>Tanggal Pembayaran</th>
            <th>Status Pembayaran</th>
            {user && user.role === "admin" && (
            <th>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
        {filteredPembayaranList.map((pembayaran, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pembayaran.user.nama}</td>
              <td>{pembayaran.user.siswa?.nomor_induk}</td>
              <td>{pembayaran.user.siswa?.kelas}</td>
              <td>{pembayaran.tagihan.nama_tagihan} {pembayaran.tagihan.tahun_ajaran}</td>
              <td>{pembayaran.tagihan.nominal}</td>
              <td>{pembayaran.tgl_pembayaran}</td>
              
              <td>{pembayaran.status_pembayaran}</td>
              {user && user.role === "admin" && (
              <td>
                <button onClick={()=> deletePembayaran(pembayaran.uuid)} className='button is-small is-danger'>Hapus</button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pembayaranlist;