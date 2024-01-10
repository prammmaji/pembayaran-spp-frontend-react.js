import React,{useEffect} from 'react'
import Layout from './Layout'
import FormEditTagihan from '../components/FormEditTagihan';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditTagihan = () => {
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
      if(user && user.role !== "admin"){
          navigate("/dashboard");
      }
  },[isError,user,navigate]);
  return (
    <Layout>
            <FormEditTagihan/>
       </Layout>
  )
}

export default EditTagihan