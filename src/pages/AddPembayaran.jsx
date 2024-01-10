import React,{useEffect} from 'react'
import Layout from './Layout'
import FormAddPembayaran from '../components/FormAddPembayaran'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
const AddPembayaran = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch(getMe());
    },[dispatch]);
    useEffect(()=>{
        if(isError){
            navigate("/");
        }
    },[isError,navigate]);
  return (
    <div>
        <Layout>
            <FormAddPembayaran/>
        </Layout>
    </div>
  )
}

export default AddPembayaran