import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormAddTagihan = () => {
  const [tahun_ajaran,setTahunAjaran]  = useState('');
  const [nama_tagihan,setNamaTagihan] = useState('');
  const [nominal,setNominal] = useState('');
  const [status,setStatus] = useState('Aktif');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveTagihan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tagihan', {
        tahun_ajaran: tahun_ajaran,
        nama_tagihan: nama_tagihan,
        nominal: nominal,
        status: status,

      });
      alert('Data Tagihan Berhasil Ditambahkan');
      navigate('/tagihan');
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
        <h1 className='title'>Tagihan</h1>
        <h2 className='subtitle'>Tambah Tagihan Baru</h2>
        <div className="card card-is-shadowerss">
        <div className="card-content">
            <div className="content">
            <form onSubmit={saveTagihan}>
            <p className='has-text-centered'>{msg}</p>
            <div className="field">
                      <label className='label'>Tahun Ajaran</label>
                      <div className="control">
                        <input type="number" className='input' value={tahun_ajaran}
                    onChange={(e) => setTahunAjaran(e.target.value)} placeholder='e.g 2022' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Nama Tagihan</label>
                      <div className="control">
                        <input type="text" className='input' value={nama_tagihan}
                    onChange={(e) => setNamaTagihan(e.target.value)} placeholder='e.g SPP Variabel' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Nominal</label>
                      <div className="control">
                        <input type="number" className='input' value={nominal}
                    onChange={(e) => setNominal(e.target.value)} placeholder='2500000' />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label'>Status Tagihan</label>
                      <div className="control">
                      <div className="select is-fullwidth">
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value="Aktif">Aktif</option>
                                <option value="NonAktif">NonAktif</option>
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

export default FormAddTagihan