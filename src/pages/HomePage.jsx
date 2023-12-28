import { useEffect, useState } from "react";
import OrdersPage from "./orders/OrdersPage";
import MedicinesPage from "./medicines/MedicinesPage";
import {Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../services/redux/AuthUserSlice";
import { Spinner } from "@material-tailwind/react";
import UsersPage from "./users/UsersPage";

const HomePage = () => {
    let location = useLocation();

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const state = useSelector((state) => state.GetAuthUserReducer);

    const [index , setIndex] = useState( location.state != null && location.state.index != null ?
         location.state.index: 0)

    const dashbord = ["Orders" , "Medicines"]

    const pages = [<OrdersPage /> , <MedicinesPage /> ] // UserPage 
  
    if(state.user != null && state.user.role_id == 2){
        dashbord.push("Users")
        pages.push(<UsersPage />)
    }

    useEffect(() => {
        dispatch(getAuthUser())        
    } , [dispatch])

    if(state.loading){
        return  <div className="w-full h-screen flex justify-center items-center">
                    <Spinner className="h-12 w-12 text-gray-900/50" />
                </div>
    }

    return(
        <div className="grid grid-cols-4 relative">
            <div className="bg-black h-screen w-56 text-white p-6 fixed  top-0 left-0">
                <ul>
                    {dashbord.map((e , index) =>
                        <li className="mb-5">
                            <button onClick={(e) => setIndex(index)}>{e}</button>
                        </li>
                    )}
                </ul>
            </div>
            <div className="h-screen w-56 "></div>
            <div className="col-span-3 pt-2 pr-10">

                <div className="flex items-center justify-between mr-2 mb-4">
                    <h1>{state.user.name} : <span className="font-bold">
                        {state.user.role_id == 1 ? 'Employees' : 'ADMIN'} </span>
                        </h1>

                    <button className="text-blue-600 font-medium mb-2" onClick={() => {
                        localStorage.removeItem("token")
                        navigate(0)
                    }}>Logout</button>
                </div>

                {pages[index]}
            </div>
        </div>
    ); 
}

export default HomePage