import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../services/redux/GetOrderDetails";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

export async function OrderViewLoader({ params }) {
  return params.id;
}

export const OrderViewPage = () => {
  const dispatch = useDispatch();

  const id = useLoaderData();

  const state = useSelector((state) => state.OrderDetailsReducer);

  useEffect(() => {
    dispatch(fetchOrderDetails({ id }));
  }, [dispatch]);

  return (
    <div className="pt-2 px-5">
     
      {state.loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner className="h-12 w-12 text-gray-900/50" />
        </div>
      ) :
      <div> 
        <h1 className="flex justify-center items-center my-4 font-bold ">
            Order {id} Details
        </h1>

        
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Quantity
            </th>
            <th scope="col" class="px-6 py-3">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {state.data.length > 0
            ? state.data.map((e) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="ps-3">
                      <div class="text-base font-semibold">{e.name}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4">{e.price} $</td>
                  <td class="px-6 py-4">
                    {e.pivot != undefined ? e.pivot.quantity : ""}
                  </td>
                  <td class="px-6 py-4">
                    {e.pivot != undefined ? e.pivot.quantity * e.price : 1} $
                  </td>
                </tr>
              ))
            : ""}

          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td
              scope="row"
              class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              
            </td>
            <td class="px-6 py-4">
            </td>
            <td class="px-6 py-4">
            </td>
           
            <td class="px-6 py-4">
              {state.totalPrice} $
            </td>
          </tr>
        </tbody>
      </table></div>}
    </div>
  );
};

export default OrderViewPage;
