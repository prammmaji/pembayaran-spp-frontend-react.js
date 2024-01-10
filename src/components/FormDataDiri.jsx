import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


const FormDataDiri = () => {
    const [nomor_induk,setNomorInduk] = useState('');
    const [kelas,setKelas] = useState('');
    const [tanggal_lahir,setTanggalLahir] = useState('');
    const [alamat,setAlamat] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
    // Cek apakah data siswa sudah ada berdasarkan ID akun yang login
    const checkSiswaData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/siswa`);
        if (res.data !== null) {
          // Jika data siswa sudah ada, tampilkan alert dan kembali ke halaman dashboard
          alert('Anda sudah mengisi data diri. Jika ada kesalahan, silahkan hubungi admin.');
          navigate('/siswa/profile');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkSiswaData();
  }, [ navigate]);
    const saveDataDiri = async (e) => {
        e.preventDefault();
        try {
      await axios.post('http://localhost:5000/siswa', {
        nomor_induk: nomor_induk,
        kelas: kelas,
        tgl_lahir:tanggal_lahir,
        alamat:alamat
      });

     setMsg('Data diri berhasil disimpan');
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    }
    
  return (
    <div>
      <h1 className='title'>Profile</h1>
      <h2 className='subtitle'>Setting Data Diri</h2>
      <Link to={`../siswa/profile`} className='button is-small is-info mr-2'>Akun</Link>
      <Link to={`#`} className='button is-small is-info mr-2 mb-2'>Data Diri</Link>
      <div className="card card-is-shadowerss">
        <div className="card-content">
            <div className="content">
            <form onSubmit={saveDataDiri} >
            <p className='has-text-centered'>{msg}</p>
            <div className="field">
                      <label className='label'>Nomor Induk</label>
                      <div className="control">
                        <input type="number" className='input' value={nomor_induk} onChange={(e) => setNomorInduk(e.target.value)} placeholder='Nomor Induk' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Kelas</label>
                      <div className="control">
                        <input type="text" className='input' value={kelas} onChange={(e) => setKelas(e.target.value)} placeholder='Kelas' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Tanggal Lahir</label>
                      <div className="control">
                        <input type="date" className='input' value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)}  />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Alamat</label>
                      <div className="control">
                        <input type="text" className='input' value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder='Alamat' />
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

export default FormDataDiri