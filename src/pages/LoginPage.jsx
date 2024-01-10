import React,{useEffect} from 'react'
import Login from '../components/Login';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isSucess,isError,user} = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch(getMe());
    },[dispatch]);
    useEffect(()=>{
        if(isSucess){
            alert("Anda Sudah Login!")
            navigate("/dashboard");
        }
        if(isError){
            navigate("/")
        }
    },[isSucess,isError,user,navigate]);
  return (
    <div>
        <Login/>
    </div>
  )
}

export default LoginPage