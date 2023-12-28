import { useLoaderData, useNavigate } from "react-router-dom";
import { getOneMedicine, updateMedicine } from "../../services/MedicineService";
import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";

import { Spinner} from "@material-tailwind/react";
import { createUserAPI, getOneUserAPI, updateUsersAPI } from "../../services/UsersService";


const CreateUserPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword ] = useState("")

  const [confirmPassword , setConfirmPassword] = useState("")

  const [address , setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [loading , setLoading] = useState(false)

  const [message, setMessage] = useState("")

  const handleSubmit = async (event) =>{
    event.preventDefault()

    setLoading(true)

    if(confirmPassword === password){
        await createUserAPI({
            name, 
            phone,
            email,
            password,
            confirmPassword,
            address,
            roleName: "Employees"
          })

          setLoading(false)

          navigate("/" , {state : {
            index : 2
          }})
    }else{
        setMessage("Confirm Password not match the Password")
    }

    setLoading(false)
  }

  return (
    <div className="container m-auto mt-4">
      <form onSubmit={handleSubmit}>

        <h2 className="text-red-800 font-bold">{message}</h2>

        <div class="mt-4 mb-3 w-1/2">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            class="w-full p-2 border border-gray-300 rounded"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div class="mb-3 w-1/2">
          <label for="price" class="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            class="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div class="mb-3 w-1/2">
          <label for="price" class="block text-gray-700 text-sm font-bold mb-2">
            Password :
          </label>
          <input
            type="password"
            id="price"
            name="price"
            class="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div class="mb-3 w-1/2">
          <label for="price" class="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password :
          </label>
          <input
            type="password"
            id="price"
            name="price"
            class="w-full p-2 border border-gray-300 rounded"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        <div class="mb-3 w-1/2">
          <label
            for="quantityInStock"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            address :
          </label>
          <input
            type="text"
            id="quantityInStock"
            name="quantityInStock"
            class="w-full p-2 border border-gray-300 rounded"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>

        <div class="mb-3 w-1/2">
          <label
            for="quantityInStock"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone :
          </label>
          <input
            type="text"
            id="quantityInStock"
            name="quantityInStock"
            class="w-full p-2 border border-gray-300 rounded"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>

      <div class="mb-4 w-1/2 flex justify-center items-center">
          <button
            type="submit"
            class="w-28 bg-green-500 text-white p-2 rounded flex items-start justify-center"
            value="submit"
          >
            {loading ? <Spinner className="h-8 w-8 text-gray-900/50" /> : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
