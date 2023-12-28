import axios from "axios"
import { AppURL } from "../Constants"


export const getMedicines = async (page, size , name) =>{
    let url = AppURL + "/api/medicines?page="+page + "&size=" + size

    if(name != undefined && name != ""){
        url += "&name="+ name
    }
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

export const getOneMedicine = async (id) =>{
    let url = AppURL + "/api/medicines/"+id

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

export const createMedicine = async (payload) =>{
    let url = AppURL + "/api/medicines/"

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

export const updateMedicine = async (payload) =>{
    let url = AppURL + "/api/medicines/"+payload.id

    try{

        console.log(payload)


        const res = await axios.put(url ,payload ,{
            headers : {
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            },
        })

        console.log(res)

        return res
    }catch(e){
        console.log(e)
    }
}

export const deleteMedicines = async (id) =>{
    let url = AppURL + "/api/medicines/"+id

    try{
        const res = await axios.delete(url , {
            headers : {
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        return res
    }catch(e){
        console.log(e)
    }
}