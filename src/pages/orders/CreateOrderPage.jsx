import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchMedicament,
  searchMedicaments,
} from "../../services/redux/MedicamentSearchSlice";
import { FaEdit } from "react-icons/fa";
import { Alert, Spinner } from "@material-tailwind/react";
import { createOrderAPI } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

export const CreateOrderPage = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();


  const dispatch = useDispatch();

  const searchState = useSelector((state) => state.MedicamentSearchReducer);

  const [medicines, setMedicines] = useState({});

  const [selectedMedicine, setSelectedMedicine] = useState({});

  const [loading, setLoading] = useState(false);

  const [columns, setColumns] = useState([
    "ID",
    "Name",
    "Quantity",
    "Price",
    "",
  ]);

  const [modalPop, setModalPop] = useState(false);

  const handleChangeName = (event) => {
    setName(event.target.value);

    dispatch(
      searchMedicaments({
        name: event.target.value,
      })
    );
  };

  const handleOnClickSearch = (medicine) => {
    const selectedMedicine = {
      medicineId : medicine.id,
      name: medicine.name,
      quantity: 1,
      price: medicine.price,
      totalPrice: medicine.price,
      quantityInStock: medicine.quantityInStock,
    };

    setMedicines((prev) => ({
      ...prev,
      [selectedMedicine.medicineId]: { ...selectedMedicine },
    }));

    dispatch(resetSearchMedicament());

    setName("");
  };

  const handleSaveClick = () => {
    if(selectedMedicine.quantityInStock < selectedMedicine.quantity){
        alert("Quantity Choosen is Bigger then in stock")
        return
    }

    setMedicines((prev) => ({
      ...prev,
      [selectedMedicine.medicineId]: { ...selectedMedicine },
    }));

    setModalPop(false);
  };

  const handleSaveOrder = async () => {
    setLoading(true)

    var currentDate = new Date();

    let year = currentDate.getFullYear()
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    let day = currentDate.getDate().toString().padStart(2, '0')

    const  formattedDate = `${year}-${month}-${day}`;

    await createOrderAPI({
        data : Object.values(medicines),
        issueDate : formattedDate
    })

    setLoading(false)

    navigate("/")
  }

  return (
    <div
      className={
        "h-screen mx-auto p-5 relative " +
        (modalPop ? "bg-gray-200" : "bg-white")
      }
    >
      <div className="bg-inherit">
        <div className="flex items-center gap-20 bg-inherit">
          <h1 className="font-bold w-2/12">Create Order</h1>

          <div class="relative w-6/12 bg-inherit">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={name}
              onChange={handleChangeName}
              type="text"
              id="table-search-users"
              class="w-full block p-2 ps-10 text-sm text-gray-900 border border-gray-300 
                        rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-inherit"
              placeholder="Search for Medicaments"
            />
          </div>
        </div>
        <div className="flex items-center gap-20 mt-1 bg-inherit">
          <div className="w-2/12"></div>
          <div className=" w-6/12 ">
            {searchState.data.length > 0
              ? searchState.data.map((e) => {
                  return (
                    <button
                      onClick={() => handleOnClickSearch(e)}
                      className="text-start w-full font-bold px-3 py-2 bg-gray-200 "
                    >
                      {e.name}{" "}
                    </button>
                  );
                })
              : ""}
          </div>
        </div>

        <table class="mt-8 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-inherit">
            <tr>
              {columns.map((e) => (
                <th scope="col" class="px-6 py-3 bg-inherit">
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(medicines).map((k) => (
              <tr class="bg-inherit ">
                <td class="px-6 py-4 bg-inherit">{medicines[k].medicineId}</td>

                <td class="px-6 py-4 bg-inherit">{medicines[k].name}</td>
                <td class="px-6 py-4 bg-inherit">
                  <div class="flex items-center pl-6 bg-inherit">
                    <div
                      className={`h-2.5 w-2.5 rounded-full me-2 bg-inherit`}
                    ></div>
                    {medicines[k].quantity}
                  </div>
                </td>
                <td class=" bg-inherit">
                  <div class="flex items-center pl-6 bg-inherit">
                    {medicines[k].quantity * medicines[k].price}
                  </div>
                </td>
                <td>
                  <FaEdit
                    color="green"
                    size={20}
                    onClick={() => {
                      setModalPop(true);

                      setSelectedMedicine({ ...medicines[k] });
                    }}
                  />
                </td>
              </tr>
            ))}

            {Object.values(medicines).length > 0 ? (
              <tr>
                <td class="px-6 py-4 bg-inherit"></td>

                <td class="px-6 py-4 bg-inherit"></td>
                <td class="px-6 py-4 bg-inherit"></td>
                <td class=" bg-inherit">
                  <div class="flex items-center pl-6 bg-inherit">
                    {Object.values(medicines).reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.totalPrice,
                      0
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>

        {Object.values(medicines).length > 0  ? (<div class="w-full flex justify-center items-center mt-8 ">
              <button
                class="w-28 bg-green-500 text-white p-2 rounded flex items-start justify-center"
                onClick={handleSaveOrder}
              >
                {loading ? (
                  <Spinner className="h-8 w-8 text-gray-900/50" />
                ) : (
                  "Save"
                )}
              </button>
        </div>) : ""}
       
      </div>

      {modalPop ? (
        <div
          className="h-full flex justify-center items-center w-full fixed left-0 top-0 rounded-md
      "
        >
          <div className="grid bg-white p-10  gap-4">
            <div className="w-full ">
              Medicine{" "}
              <h2 className="font-bold inline-block ml-2">
                {" "}
                {selectedMedicine.name}
              </h2>
            </div>
            <div class="w-full">
              <label
                for="name"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Quantity :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full p-2 border border-gray-300 rounded"
                required
                value={selectedMedicine.quantity}
                onChange={(event) => {
                  setSelectedMedicine({
                    ...selectedMedicine,
                    quantity: event.target.value,
                    totalPrice: event.target.value * selectedMedicine.price,
                  });
                }}
              />
            </div>
            <div class="w-full">
              <label
                for="name"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Price :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full p-2 border border-gray-300 rounded"
                readOnly
                required
                value={selectedMedicine.price * selectedMedicine.quantity}
              />
            </div>

            <div class="w-full flex justify-center items-center">
              <button
                class="w-28 bg-green-500 text-white p-2 rounded flex items-start justify-center"
                onClick={handleSaveClick}
              >
                {loading ? (
                  <Spinner className="h-8 w-8 text-gray-900/50" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateOrderPage;
