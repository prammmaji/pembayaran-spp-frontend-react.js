import React, {useEffect,useState} from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [tagihankosong,setTagihanKosong] = useState('')
  const {user} = useSelector((state) => state.auth)
  const [TagihanList, setTagihanList] = useState([]);
  const [jumlahSiswa,setJumlahSiswa] = useState('')
  const [jumlahUser,setJumlahUser] = useState('')
  const [jumlahValidasi,setJumlahValidasi] = useState('')
  const [jumlahGagal,setJumlahGagal] = useState('')
  const [jumlahTagihanAktif,setJumlahTagihanAktif] = useState('')
    useEffect(() => {
        getTagihanList();
        hitung()
    }, []);
  
    const getTagihanList = async () => {
      const response = await axios.get('http://localhost:5000/tagihan/aktif')
      setTagihanList(response.data)
      if (response.data.length === 0) {
        setTagihanKosong('Tidak Ada Tagihan Untuk Anda. Terimakasih!');
      }
    }
    const hitung = async () => {
      
      const response = await axios.get('http://localhost:5000/hitung')
      setJumlahTagihanAktif(response.data.jumlahTagihan)
      setJumlahSiswa(response.data.jumlahSiswa)
      setJumlahUser(response.data.jumlahUser)
      setJumlahValidasi(response.data.jumlahPembayaran)
      setJumlahGagal(response.data.jumlahGagal)
    
    }
  
  return (
    <div className='card card-is-shadowless'>
    <h1 className='title' style={{marginLeft:'20px'}}>Dashboard</h1>
    <h2 className='subtitle' style={{marginLeft:'20px'}}>Selamat datang <strong>{user && user.nama}</strong></h2>
    {user && user.role === "siswa" && (
    <div className='card-content column has-background-light ml-5 mr-5 ' style={{ borderRadius: '10px' }}>
    <div className='content'>
    <h2 className='subtitle' style={{marginLeft:'20px', fontWeight:'bold'}}>Daftar Tagihan Anda :</h2>
    <table className='table is-striped is-fullwidth'>
        <thead>
            <tr >
                <th>No</th>
                <th>Tahun Ajaran</th>
                <th>Nama Tagihan</th>
                <th>Nominal</th>
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
                <td><Link to={`/pembayaran/add/${tagihan.id}`} className='button is-primary mb-5'>Bayar</Link></td>
                
            </tr>
            ))}
        </tbody>
    </table>
    <div className='has-centered'>
      <h1>{tagihankosong}</h1>
    </div>
    </div>
    
    </div>
    )}
    {user && user.role === "admin" && (
    <div className='card-content column has-background-light ml-5 mr-5 ' style={{ borderRadius: '10px'}}>
        <div className='container' style={{ borderRadius: '10px', display:'flex' }}>
            <div className='container has-background-info' style={{ color:'whitesmoke',display: 'flex', flexDirection: 'column',borderRadius: '10px'}}>
              <p className='has-text-centered' style={{fontWeight:'bold'}}>Jumlah Tagihan Aktif:</p>
              <p className='has-text-centered'><span>{jumlahTagihanAktif}</span></p>
              <Link to={`/tagihan`} className='button is-primary mb-5'  style={{ margin: '0 50px' }}>Cek Tagihan  </Link>
            </div>
        <div className='container ml-3 has-background-grey' style={{ color:'whitesmoke',display: 'flex', flexDirection: 'column',borderRadius: '10px'}}>
            <p className='has-text-centered' style={{fontWeight:'bold'}}>Jumlah Siswa:</p>
            <p className='has-text-centered' ><span>{jumlahSiswa}</span></p>
            <Link to={`/siswa`} className='button is-primary' style={{ margin: '0 50px' }}>Cek Daftar Siswa  </Link>
        </div>
        <div className='container ml-3 has-background-warning-dark' style={{ color:'whitesmoke',display: 'flex', flexDirection: 'column',borderRadius: '10px'}}>
            <p className='has-text-centered' style={{fontWeight:'bold'}}>Pembayaran Menunggu Validasi:</p>
            <p className='has-text-centered' ><span>{jumlahValidasi}</span></p>
            <Link to={`/pembayaran`} className='button is-primary' style={{ margin: '0 50px' }}>Cek Pembayaran  </Link>
        </div>
        </div>
          <div className='container mt-5' style={{ borderRadius: '10px', display:'flex' }}>
            <div className='container  has-background-warning-dark' style={{ color:'whitesmoke',display: 'flex', flexDirection: 'column',borderRadius: '10px'}}>
              <p className='has-text-centered' style={{fontWeight:'bold'}}>Jumlah User:</p>
              <p className='has-text-centered' ><span>{jumlahUser}</span></p>
              <Link to={`/users`} className='button is-primary mb-5' style={{ margin: '0 50px' }}>Cek Users  </Link>
            </div>
            <div className='container ml-3 has-background-info' style={{ color:'whitesmoke',display: 'flex', flexDirection: 'column',borderRadius: '10px'}}>
              <p className='has-text-centered' style={{fontWeight:'bold'}}>Jumlah Pembayaran Gagal:</p>
              <p className='has-text-centered' ><span>{jumlahGagal}</span></p>
              <Link to={`/pembayaran`} className='button is-primary mb-5' style={{ margin: '0 50px' }}>Cek Pembayaran  </Link>
            </div>
        </div>

    </div>
    )}
    </div>
    
  )
}

export default Welcome