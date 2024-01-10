import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditSiswa = () => {
  const [nama, setNama] = useState('');
  const [nomor_induk, setNomorInduk] = useState(0);
  const [kelas, setKelas] = useState('');
  const [tanggal_lahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSiswaById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/siswa/${id}`);
        console.log(response.data)
        setNama(response.data[0].user.nama);
        setNomorInduk(response.data[0].nomor_induk);
        setKelas(response.data[0].kelas);
        setTanggalLahir(response.data[0].tgl_lahir);
        setAlamat(response.data[0].alamat);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getSiswaById();
  }, [id]);

  const updateSiswa = async (e) => {
    e.preventDefault();
    const data = {
      nomor_induk,
      kelas,
      tanggal_lahir,
      alamat
    };
    try {
      const res = await axios.patch(`http://localhost:5000/siswa/${id}`, data);
      setMsg(res.data.msg);
      alert(res.data.msg);
      navigate('/siswa');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Siswa</h1>
      <h2 className="subtitle">Edit Data Siswa</h2>
      <div className="card card-is-shadowerss">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateSiswa}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Siswa : <span><b>{nama}</b></span></label>
                
              </div>
              <div className="field">
                <label className="label">Nomor Induk</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={nomor_induk}
                    onChange={(e) => setNomorInduk(e.target.value)}
                    placeholder="Nomor Induk"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Kelas</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="Kelas"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Lahir</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </div>
              </div>
              <div className="field mt-5">
                <button type='submit'  className="button is-success is-fullwidth">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditSiswa;