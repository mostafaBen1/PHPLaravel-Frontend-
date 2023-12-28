import axios from "axios"
import { AppURL } from "../Constants"

export const getAuthUserAPI = async () => {
    let url = AppURL + "/api/user"

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

export const getUsersAPI = async (page, size , name) =>{
    let url = AppURL + "/api/users?page="+ page + "&size=" + size

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

export const getOneUserAPI = async (id) =>{
    let url = AppURL + "/api/users/"+id

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

export const createUserAPI = async (payload) =>{
    let url = AppURL + "/api/users"

    try{
        console.log(payload)

        const res = await axios.post(url , payload ,{
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

export const updateUsersAPI = async (payload) =>{
    let url = AppURL + "/api/users/"+payload.id
    try{

        const res = await axios.put(url ,payload ,{
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

export const deleteUsersAPI = async (id) =>{
    let url = AppURL + "/api/users/"+id

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
