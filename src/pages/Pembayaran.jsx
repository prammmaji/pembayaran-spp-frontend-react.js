import React,{useEffect} from 'react'
import Layout from './Layout'
import Pembayaranlist from '../components/Pembayaranlist'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Pembayaran = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError,user} = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch(getMe());
    },[dispatch]);
    useEffect(()=>{
      if(isError){
          navigate("/");
      }
      
  },[isError,user,navigate]);
  return (
    <div>
        <Layout>
            <Pembayaranlist/>
        </Layout>
    </div>
  )
}

export default Pembayaran