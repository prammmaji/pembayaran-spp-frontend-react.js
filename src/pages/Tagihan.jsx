import React,{useEffect} from 'react'
import Layout from './Layout'
import TagihanList from '../components/TagihanList';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
const Tagihan = () => {
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
    <div>
        <Layout>
            <TagihanList/>
        </Layout>
    </div>
  )
}

export default Tagihan