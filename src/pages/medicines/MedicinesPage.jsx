import { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";

import { useSelector, useDispatch } from "react-redux";

import {
  changeMedicineIds,
  changeMedicinesByGlobalCheck,
  deleteMedicaments,
  fetchMedicaments,
} from "../../services/redux/GetMedicinesState";

import { Spinner} from "@material-tailwind/react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MedicinesPage = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");

  const [page, setPage] = useState(1);

  const [size, setSize] = useState(10);

  const [globalCheck, setGlobalCheck] = useState(false);

  const fetchPages = () => {
    const pages = [];
    let currentPage = page;

    while (currentPage > 0 && currentPage >= page - 2) {
      pages.push(currentPage);
      currentPage--;
    }

    currentPage = page + 1;
    while (pages.length < 5) {
      pages.push(currentPage);
      currentPage++;
    }

    pages.sort();

    return pages;
  };

  const pages = fetchPages();

  const state = useSelector((state) => state.GetMedicinesSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchMedicaments({
        page: page,
        size: size,
      })
    );
  }, [dispatch, page, size]);

  const changePage = (page) => {
    setPage(page);

    dispatch(
      fetchMedicaments({
        page: page,
        size: size,
        name: name,
      })
    );
  };

  const changeName = (event) => {
    setName(event.target.value);

    setTimeout(() => {
      dispatch(
        fetchMedicaments({
          page: page,
          size: size,
          name: event.target.value,
        })
      );
    }, 100);
  };

  const checkGlobalBox = (_) => {
    setGlobalCheck(!globalCheck);
    dispatch(changeMedicinesByGlobalCheck(!globalCheck));
  };

  const onChangeTableCheckBox = (index) => {
    if (state.Ids[index]) {
      setGlobalCheck(false);
    } else {
      let global = true;

      state.Ids.forEach((e, i) => {
        if (i != index && !e) {
          global = false;
        }
      });
      setGlobalCheck(global);
    }
    dispatch(changeMedicineIds([index]));
  };

  const deleteMedicamentsByIds = (Ids) => {
    dispatch(
      deleteMedicaments({
        Ids: Ids,
        page: page,
        size: size,
        name: name,
      })
    );
  };

  const handleSizeChange = (value) => {
    setSize(value);

    dispatch(
      fetchMedicaments({
        page: page,
        size: value,
        name: name,
      })
    );
  };

  return (
    <div className="w-full">
      {state.loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner className="h-12 w-12 text-gray-900/50" />
        </div>
      ) : (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
          <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div className="flex w-72 flex-col gap-6">
              <Select
                variant="standard"
                label="size"
                onChange={handleSizeChange}
                value={`${size}`}
                defaultValue={`${size}`}
              >
                <Option key={1} value="10">
                  10
                </Option>
                <Option key={2} value="25">
                  25
                </Option>
                <Option key={3} value="50">
                  50
                </Option>
              </Select>
            </div>
            <div className="pl-6">
              {state.Ids.filter((e) => e == true).length > 0 ? (
                <FaTrash
                  color="red"
                  onClick={() =>
                    deleteMedicamentsByIds(
                      state.data
                        .map((e, i) => {
                          if (state.Ids[i]) return e.id;
                        })
                        .filter((e) => e != undefined)
                    )
                  }
                />
              ) : (
                ""
              )}
            </div>
            <label for="table-search" class="sr-only">
              Search
            </label>
            <div class="relative">
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
                onChange={changeName}
                type="text"
                id="table-search-users"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 
                        rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Medicaments"
              />
            </div>
          </div>

          <div className="flex justify-end px-1.5 mr-2">
            <button 
            onClick={() =>{
              navigate("/medicaments/create")
            }}
            type="button" class=" text-white bg-deep-orange-800 hover:bg-orange-900 focus:outline-none focus:ring-4  rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2">Create</button>
          </div>

          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      checked={globalCheck}
                      onChange={checkGlobalBox}
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity In Stock
                </th>
                <th scope="col" class="px-6 py-3">
                  Expire Date
                </th>

                <th scope="col" class="px-6 py-3"></th>

                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((e, i) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        onChange={() => onChangeTableCheckBox(i)}
                        checked={state.Ids[i]}
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="ps-3">
                      <div class="text-base font-semibold">{e.name}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4">{e.price}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center pl-6">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          e.quantityInStock > 0 ? "bg-green-500" : "bg-red-500"
                        } me-2`}
                      ></div>
                      {e.quantityInStock}
                    </div>
                  </td>
                  <td class="px-6 py-4">{e.expireDate}</td>
                  <td>
                    <FaEdit color="green" size={20} onClick={() => {
                        navigate("/medicaments/edit/"+e.id)
                    }}/>
                  </td>

                  <td>
                    <FaTrash
                      color="red"
                      size={15}
                      onClick={() => deleteMedicamentsByIds([e.id])}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav className="my-4 p-3 flex justify-center">
            <ul class="flex items-center -space-x-px h-10 text-base">
              <li
                onClick={() => {
                  if (page > 1) changePage(page - 1);
                }}
              >
                <a
                  href="#"
                  class="flex items-center justify-center px-4 h-10 rotate-180	
                             leading-tight text-gray-500 bg-white border
                              border-gray-300 rounded-e-lg hover:bg-gray-100
                              hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
                               dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>

              {pages.map((e, i) => (
                <li
                  key={i}
                  onClick={() => {
                    changePage(e);
                  }}
                >
                  <a
                    href="#"
                    className={`${
                      e === page
                        ? "bg-blue-gray-500 text-white"
                        : "bg-white text-gray-500"
                    } flex items-center justify-center rounded-sm px-4 h-10 leading-tight   border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                  >
                    {e}
                  </a>
                </li>
              ))}

              <li
                onClick={() => {
                  if (page < state.totalPage) changePage(page + 1);
                }}
              >
                <a
                  href="#"
                  class="flex items-center justify-center px-4 h-10
                             leading-tight text-gray-500 bg-white border
                              border-gray-300 rounded-e-lg hover:bg-gray-100
                              hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
                               dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MedicinesPage;
