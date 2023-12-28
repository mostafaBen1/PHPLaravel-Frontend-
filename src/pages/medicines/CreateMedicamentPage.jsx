import { useLoaderData, useNavigate } from "react-router-dom";
import {
  createMedicine,
  getOneMedicine,
  updateMedicine,
} from "../../services/MedicineService";
import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";

import { Spinner } from "@material-tailwind/react";

const CreateMedicamentPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);

  const [prescriptionRequired, setPrescriptionRequired] = useState(false);

  const [quantityInStock, setQuantityInStock] = useState(0);

  const [expireDate, setExpireDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    await createMedicine({
      name,
      price,
      quantityInStock,
      prescriptionRequired,
      expireDate,
    });

    setLoading(false);

    navigate("/" , {state : {
      index : 1
    }});
  };

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
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            class="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>

        <div class="mb-3 w-1/2">
          <label
            for="quantityInStock"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            quantityInStock:
          </label>
          <input
            type="text"
            id="quantityInStock"
            name="quantityInStock"
            class="w-full p-2 border border-gray-300 rounded"
            value={quantityInStock}
            onChange={(event) => setQuantityInStock(event.target.value)}
            required
          />
        </div>

        <div className="flex w-1/2 flex-col gap-6 mb-4">
          <Select
            variant="outlined"
            label="prescriptionRequired"
            onChange={(value) =>
              setPrescriptionRequired(value == "true" ? true : false)
            }
            value={`${prescriptionRequired}`}
          >
            <Option key={1} value="true">
              true
            </Option>
            <Option key={2} value="false">
              false
            </Option>
          </Select>
        </div>

        <div class="w-1/2 mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
            ExpireDate:
          </label>
          <input
            value={expireDate}
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            onChange={(event) => setExpireDate(event.target.value)}
          />
        </div>

        <div class="mb-4 w-1/2 flex justify-center items-center">
          <button
            type="submit"
            class="w-28 bg-green-500 text-white p-2 rounded flex items-start justify-center"
            value="submit"
          >
            {loading ? (
              <Spinner className="h-8 w-8 text-gray-900/50" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMedicamentPage;
