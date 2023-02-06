import { /*useEffect,*/useContext, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"

import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import JWTService from '../services/JWTService';

import { toast } from 'react-toastify';


export function useAuth () {
    const navigate = useNavigate();
    const {loadUser, checkAdmin, setJWT, setUser } = useContext(AuthContext)

    const [ status, setStatus ] = useState({loading: false, error: false})

    const signup = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.registerUser(data) 
        .then((res) => {
            setUserLoged(res);            
        }).catch((error) => {
            if (error.response.data == "Email exist.") {
                toast.error("The email already belongs to an account", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setStatus({ loading: false, error: true });
            }
        });
    },[setStatus]);

    const signin = useCallback((data) => {
        setStatus({ loading: true});
        AuthService.loginUser(data) 
        .then((res) => {
            setUserLoged(res);     
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data == 'email or password not correct') {
                toast.error("Email or password is not correct", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setStatus({ loading: false});
            }
        });
    },[setStatus]);

    const setUserLoged = useCallback((res) => {
        setStatus({ loading: false, error: false }); 
        JWTService.saveToken(res.data.token, res.data.rftoken);
        toast.success("User " + res.data.user.first_name + " login successfully", {
            position: toast.POSITION.TOP_CENTER
        });
        async function loadData() {
            await loadUser()
            await checkAdmin()
        }
        loadData()
        navigate('/'); 
    }, [setStatus, navigate])


    const logout = useCallback(() => {
        JWTService.destroyToken()
        setUser(null)
        setJWT(null)
        navigate("/")
    }, [setJWT, setUser, navigate])


    const updateUser = useCallback((data) => {
        console.log("Dentro del Update user");
        // setStatus({ loading: true, error: false });
        // AuthService.updateUser(data) 
        // .then((response) => {
        //     setStatus({ loading: false, error: false });
        //     navigate('/');
        // }).catch((error) => {
        //     setStatus({ loading: false, error: true });
        // });
    },[navigate]);

    

    return {status,signup,signin,setUserLoged,logout,updateUser,loadUser, checkAdmin, setJWT, setUser}
}


