import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { set } from 'lodash';

const FormAddPembayaran = () => {
  const [idTagihan, setidTagihan] = useState('1');
  const [tahunAjaran,setTahunAjaran] = useState('');

  const [namaTagihan, setNamaTagihan] = useState('');
  const [nominalTagihan, setNominalTagihan] = useState(0);
  const [msg, setMsg] = useState('');
  const {id} = useParams()
  const navigate = useNavigate();

  const [token,setToken] = useState('')
  useEffect(() => {
    const fetchTagihanData = async () => {
      
      try {
        const res = await axios.get(`http://localhost:5000/tagihan/${id}`);
        const tagihanData = res.data;

        if (tagihanData) {
          setTahunAjaran(tagihanData.tahun_ajaran);
          setNamaTagihan(tagihanData.nama_tagihan);
          setNominalTagihan(tagihanData.nominal);
        }

      } catch (error) {
        console.log(error);
      }
      setidTagihan(id)
    };

    fetchTagihanData();
  }, []);


  // const savePembayaran = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('tagihanId', idTagihan);
  //     await axios.post('http://localhost:5000/pembayaran', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     navigate('/pembayaran');
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       setMsg(error.response.data.msg);
  //     }
  //   }
  // };

  const proses = async (e) => {
    e.preventDefault();
    const cek = await axios.get(`http://localhost:5000/cekBayar/${id}`)
      if(cek.data === null){
    try {
      const data = {
        nominal: nominalTagihan,
      };
      const res = await axios.post('http://localhost:5000/pembayaran/midtrans', data);
      setToken(res.data.token);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    } else{
      alert('Anda sudah membayar tagihan ini')
      navigate('/pembayaran');
    }
  };
  
  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: function (result) {
          try {
            axios.post('http://localhost:5000/pembayaran', {
             tagihanId: idTagihan,

           });
           navigate('/pembayaran');
         } catch (error) {
           console.log(error);
           if (error.response) {
             setMsg(error.response.data.msg);
           }
         }
          localStorage.setItem('Pembayaran', JSON.stringify(result));
          setToken('');
        
        },
        onPending: function (result) {
          localStorage.setItem('Pembayaran', JSON.stringify(result));
          setToken('');
        },
        onError: function (result) {
          console.log('error');
          console.log(result);
          setToken('');
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
          setToken('');
        },
        
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
      scriptTag.src = midtransUrl

      const midtransClientKey = "Mid-xxxxx"
      scriptTag.setAttribute("data-client-key", midtransClientKey)

      document.body.appendChild(scriptTag)
      return () => {
        document.body.removeChild(scriptTag)
      }
  }, [])
  return (
    <div>
      <h1 className='title'>Pembayaran</h1>
      <h2 className='subtitle'>Tambah Pembayaran</h2>
      <div className='card card-is-shadowless'>
        <div className='card-content' style={{ display: 'flex' }}>
          <div className='content' style={{marginLeft:'55px'}}>
            <form onSubmit={proses}>
              <p className='has-text-centered'>{msg}</p>
              <div className='content'>
              <div className='subtitle' style={{fontWeight: 'bold'}}>Detail Tagihan</div>
              <div>
                
                <label className='label'>Nama tagihan : <span >{namaTagihan} {tahunAjaran}</span></label>
                <label className='label'>Nominal tagihan : <span>Rp.{nominalTagihan.toLocaleString()}</span></label>
                <label className='label'>Rekening Pembayaran :</label>
                <label className='label'>- 123456789 ( BANK BNI )</label>
                <label className='label'>- 121212121( BANK MANDIRI )</label>
                <label className='label'>- 987654321( BANK BRI )</label>
                <label className='label'>A.N SMP </label>
              </div>
          </div>
              <div className='field mt-5'>
                <button className='button is-success is-fullwidth'>Bayar</button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FormAddPembayaran;