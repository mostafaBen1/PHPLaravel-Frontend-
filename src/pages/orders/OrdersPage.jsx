import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOrdersByGlobalCheck, changeOrdersIds, fetchOrders } from "../../services/redux/OrderSlice";
import { Option, Select, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const OrdersPage = () =>{
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const [size, setSize] = useState(10);

    const [globalCheck, setGlobalCheck] = useState(false);

    const [columns, setColumns] = useState(['ID', 'issueDate'  ,'totalPrice' , 'totalQuantity'])

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
    const changePage = (page) => {
        setPage(page);
    
        dispatch(
            fetchOrders({
            page: page,
            size: size
          })
        );
      };
    const pages = fetchPages();

    const state = useSelector((state) => state.GetOrderReducer);

    const userState = useSelector((state) => state.GetAuthUserReducer);

    useEffect(() => {
        dispatch(fetchOrders({
            page, size
        }))

        if(userState.user.role_id != 1){
            setColumns([...columns , 'Employees'])
        }

    }, [dispatch, page, size])

    const checkGlobalBox = (_) => {
        setGlobalCheck(!globalCheck);
        dispatch(changeOrdersByGlobalCheck(!globalCheck));
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
        dispatch(changeOrdersIds([index]));
      };
    

      const handleSizeChange = (value) => {
        setSize(value);
    
        dispatch(
          fetchOrders({
            page: page,
            size: value,
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
              </div>
    
              <div className="flex justify-end px-1.5 mr-2">
                <button 
                onClick={() =>{
                  navigate("/orders/create")
                }}
                type="button" class=" text-white bg-deep-orange-800 hover:bg-orange-900 focus:outline-none focus:ring-4  rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2">Create</button>
              </div>
    
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>

                    {columns.map(e => 
                        <th scope="col" class="px-6 py-3">
                                {e}
                        </th>
                        )
                    }
                  
    
                  </tr>
                </thead>
                <tbody>
                  {state.data.map((e, i) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4">{e.id}</td>

                      <td class="px-6 py-4">{e.issueDate}</td>

                      <td class="px-6 py-4">{e.totalPrice}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center pl-6">
                          <div
                            className={`h-2.5 w-2.5 rounded-full me-2`}
                          ></div>
                          {e.totalQuantity}
                        </div>
                      </td>

                      {e.user != undefined ?  <td class="px-6 py-4">{e.user.name}</td> : ""}

                      <td>
                        <FaEdit color="green" size={20} onClick={() => {
                            navigate("/orders/view/"+e.id)
                        }}/>
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
    
}

export default OrdersPage