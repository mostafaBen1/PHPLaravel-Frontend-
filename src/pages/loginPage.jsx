import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppURL } from "../Constants";

import axios from "axios";
import { Spinner } from "@material-tailwind/react";

const LoginPage = (_) => {
  const navigate = useNavigate();

  const location = useLocation()


  let [loading, setLoading] = useState(false);

  let [password, setPassword] = useState("");

  let [email, setEmail] = useState("");

  const [messageError, setMessageError] = useState("");

  useEffect(() => {

  } , [location.key])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const result = await axios.post(AppURL + "/api/login", {
        email: email,
        password: password,
      });

      if (result.data.token != undefined) {
        localStorage.setItem("token", result.data.token);
        navigate(0)
      } else {
        setMessageError(result.data);
      }

      setLoading(false);

    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div class="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 class="text-2xl font-bold mb-6">Pharmacy App</h2>
        <form onSubmit={handleSubmit}>
          <h1 className="text-red-600 mb-4 font-bold"> {messageError}</h1>
          <div class="mb-4">
            <label
              for="username"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => {
                setMessageError("");

                setEmail(e.target.value);
              }}
              name="username"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setMessageError("")
                setPassword(e.target.value)}}
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div class="mb-4 flex items-center justify-center">
            <button
              type="submit"
              class="flex items-center justify-center bg-green-500 text-white p-2 rounded w-full"
              value="submit"
            >
              {" "}
              {loading ? (
                <Spinner className="h-8 w-8 text-gray-900/50" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
