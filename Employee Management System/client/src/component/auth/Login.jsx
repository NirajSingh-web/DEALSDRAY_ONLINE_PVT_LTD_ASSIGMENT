import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ setisAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [passwordVissibillity, setPasswordVisibility] = useState("password");
  const [logintype, setLoginType] = useState("Email address");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    aunthenticateuser();
  };
  const aunthenticateuser = async () => {
    try {
      let userdetail;
      setloading(true);
      if (logintype === "Email address") {
        userdetail = {
          email,
          password,
        };
      } else {
        userdetail = {
          username,
          password,
        };
      }
      const res = await fetch("http://localhost:5000/user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdetail),
      });
      const data = await res.json();
      if (data["token"]) {
        authentication(data["token"]);
        console.log(data["token"]);
      } else {
        setloading(false);
        alert(JSON.stringify(data));
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
      setloading(false);
    }
  };
  const authentication = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/user/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data["msg"]) {
        localStorage.setItem("token", token);
        setisAuthenticated(true);
        setloading(false);
        Navigate("/");
      } else {
        setloading(false);
        alert(data);
      }
    } catch (er) {
      console.log(er.message);
      setloading(false);
      alert(er.message);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name={logintype === "Email address" ? "email" : "username"}
                type={logintype === "Email address" ? "email" : "text"}
                autoComplete={
                  logintype === "Email address" ? "email" : "username"
                }
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={logintype}
                value={logintype === "Email address" ? email : username}
                onChange={(e) =>
                  logintype === "Email address"
                    ? setEmail(e.target.value)
                    : setusername(e.target.value)
                }
              />
            </div>
            <div className="relative">
              <input
                name="password"
                type={passwordVissibillity}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500  sm:text-sm overflow-visible"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() =>
                  passwordVissibillity === "password"
                    ? setPasswordVisibility("text")
                    : setPasswordVisibility("password")
                }
              >
                <i className="fa fa-eye"></i>
                <span
                  className={`absolute right-[5px] top-[-0.5px] select-none  ${
                    passwordVissibillity === "text" ? "hidden" : "block"
                  } `}
                >
                  /
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={() => {
                  logintype === "Email address"
                    ? setLoginType("Username")
                    : setLoginType("Email address");
                }}
              >
                Try with {logintype === "Email address" ? "Username" : "Email"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10V7a5 5 0 0 1 10 0v3h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2zm5-3v3h2V7a3 3 0 0 0-6 0v3h2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
