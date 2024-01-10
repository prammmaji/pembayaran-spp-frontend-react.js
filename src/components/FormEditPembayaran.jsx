import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const FormEditPembayaran = () => {
  
  const [nama,setNama] = useState('')
  const [nama_tagihan, setNamaTagihan] = useState('');
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);
  const [tglPembayaran, setTglPembayaran] = useState('');
  const [msg, setMsg] = useState('');
  const [status_pembayaran, setStatusPembayaran] = useState('Lunas');
  const navigate = useNavigate();
  const {id} = useParams()



  useEffect(()=>{
    const getPembayaranById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
        setNama(response.data.user.nama)
        setNamaTagihan(response.data.tagihan.nama_tagihan)
        setTglPembayaran(response.data.tgl_pembayaran);
        setBuktiPembayaran(response.data.bukti_pembayaran);
      } catch (error) {
        if (error.response) {
        setMsg(error.response.data.msg)
        console.log(id);
      }
      }
    }
    getPembayaranById()
  },[id])

  const updatePembayaran = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pembayaran/${id}`, {
        status_pembayaran: status_pembayaran,
      })

      navigate('/pembayaran');
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  return (
    <div>
    <h1 className='title'>Pembayaran</h1>
    <h2 className='subtitle'>Update Pembayaran</h2>
    <div className="card card-is-shadowless">
        <div className="card-content">
            <div className="content">
            <form onSubmit={updatePembayaran}>
            <p className='has-text-centered'>{msg}</p>
                    <div className="field">
                      <label className='label'>Nama Siswa</label>
                        <div className="control">
                          <input type="text" className='input' value={nama} />
                        </div>
                    </div>
                    <div className="field">
                      <label className='label'>Nama Tagihan</label>
                        <div className="control">
                          <input type="text" className='input' value={nama_tagihan} />
                       </div>
                    </div>
                    <div className="field">
                       <label className='label'>Tanggal Pembayaran</label>
                          <div className="control">
                              <input type="text" value={tglPembayaran} className='date' />
                          </div>
                    </div>
                    <div className="field">
                       <label className='label'>Bukti Pembayaran</label>
                          <div className="control">
                              <a href={`http://localhost:5000/${buktiPembayaran}`} target="_blank">Lihat File</a>
                          </div>
                    </div>
                    <div className="field">
                      <label className='label'>Status Pembayaran</label>
                      <div className="control">
                      <div className="select is-fullwidth">
                            <select value={status_pembayaran}
                      onChange={(e) => setStatusPembayaran(e.target.value)}>
                                <option value="Lunas">Lunas</option>
                                <option value="Ditolak">Ditolak</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button type='submit' className="button is-success is-fullwidth">Simpan</button>
                    </div>
                  </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FormEditPembayaran