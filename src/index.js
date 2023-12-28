import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from './pages/loginPage';

import { Provider } from 'react-redux'

import { store } from './store'
import EditProductPage, { EditMedicamentLoader } from './pages/medicines/EditMedicamentPage';
import CreateMedicamentPage from './pages/medicines/CreateMedicamentPage';
import EditUserPage, { EditUsersLoader } from './pages/users/EditUserPage';
import CreateUserPage from './pages/users/CreateUserPage';
import OrderViewPage, { OrderViewLoader } from './pages/orders/OrderView';
import CreateOrderPage from './pages/orders/CreateOrderPage';
import LoginWrapper from './components/LoginWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element:<LoginWrapper>
      <App />
    </LoginWrapper> ,
  },
  {
    path : "/login",
    element : <LoginPage />
  },
  {
    path : "/medicaments/create",
    element :<LoginWrapper>
      <CreateMedicamentPage />
    </LoginWrapper> ,
  },
  {
    path : "/medicaments/edit/:id",
    element : <LoginWrapper><EditProductPage /></LoginWrapper>,
    loader: EditMedicamentLoader
  },
  {
    path : "/users/create",
    element : <LoginWrapper>
      <CreateUserPage />
    </LoginWrapper> ,
  },
    {
      path : "/users/edit/:id",
      element : <LoginWrapper><EditUserPage /></LoginWrapper>,
      loader: EditUsersLoader
    },
    {
      path : "/orders/view/:id",
      element : <LoginWrapper><OrderViewPage /></LoginWrapper>,
      loader: OrderViewLoader
    },
    {
      path : "/orders/create",
      element : <LoginWrapper>
        <CreateOrderPage />
      </LoginWrapper> 
    }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
