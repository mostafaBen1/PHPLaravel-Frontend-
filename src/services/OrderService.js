import axios from "axios"
import { AppURL } from "../Constants"

export const getOrdersAPI = async (page, size) =>{
    let url = AppURL + "/api/orders?page="+ page + "&size="+ size

    try{
        const res = await axios.get(url , {
            headers : {
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        return res
    }catch(e){
        return 0;
    }
}

export const getOrderAPI = async (id) =>{
    let url = AppURL + "/api/orders/"+id

    try{
        const res = await axios.get(url , {
            headers : {
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })

        console.log(res)
        return res
    }catch(e){
        return 0;
    }
}

export const createOrderAPI = async (payload) =>{
    let url = AppURL + "/api/orders/"
    
    console.log(payload)

    try{
        const res = await axios.post(url ,payload ,{
            headers : {
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            },
        })

        return res
    }catch(e){
        console.log(e)
    }
}
