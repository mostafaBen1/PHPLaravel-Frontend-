import { useLoaderData, useNavigate } from "react-router-dom";
import { getOneMedicine, updateMedicine } from "../../services/MedicineService";
import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";

import { Spinner} from "@material-tailwind/react";
import { getOneUserAPI, updateUsersAPI } from "../../services/UsersService";


export async function EditUsersLoader({ params }) {
  const res = await getOneUserAPI(params.id);
  return res.data;
}

const EditUserPage = () => {
  const data = useLoaderData();

  const navigate = useNavigate();

  const [name, setName] = useState(data.name);

  const [email, setEmail] = useState(data.email);

  const [address , setAddress] = useState(data.address);

  const [phone, setPhone] = useState(data.phone);

  const [loading , setLoading] = useState(false)

  const handleSubmit = async (event) =>{
    event.preventDefault()

    setLoading(true)

    await updateUsersAPI({
      name, 
      phone,
      email,
      address,
      id : data.id
    })

    setLoading(false)

    navigate("/" , {state : {
      index : 2
    }})
    
  }

  return (
    <div className="container m-auto ">
      <form onSubmit={handleSubmit}>
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
            readonly="readonly"
            id="price"
            name="price"
            class="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

export default EditUserPage;
