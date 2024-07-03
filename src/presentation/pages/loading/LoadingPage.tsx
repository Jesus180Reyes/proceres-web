/* eslint-disable react-hooks/exhaustive-deps */
import { HashLoader } from "react-spinners"
import { Api } from "../../../config/api/api";
import { LoginAuthResponse } from "../../../datasource/entities/responses/loginauth_response";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { logOut, login } from "../../store/slices/auth/auth";
import { useEffect, useState } from "react";
import { Status } from "../../../datasource/entities/status";


 const LoadingPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [, setstatus] = useState<Status>(Status.notStarted);
  const isTokenValid = async():Promise<boolean> => {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
    try {
        if(!token || !id) {
             navigate('/auth/login', {replace: true});
            dispatch(logOut());
            return false;
    
        }
        setstatus(Status.inProgress)
        const resp = await Api.instance.get<LoginAuthResponse>(`/api/auth/user/${id}`);
        const  data = resp.data;
        dispatch(login(data));
        navigate('/home');
        setstatus(Status.done)
        return true;
        
    } catch (error) {
        console.log(error);
        dispatch(logOut());
        navigate('/auth/login');
        setstatus(Status.notStarted)
        return false;
        
    }
  };
  useEffect(() => {
    isTokenValid();
    
  },[] );
  
  
  return (
    
    <>
      <div className="w-[100%] min-h-screen flex justify-center items-center flex-col">
        <HashLoader color="green" size={100} />
        <span className="mt-6 text-xl">Cargando...</span>
      </div>
    </>
  )
}

export default LoadingPage;
