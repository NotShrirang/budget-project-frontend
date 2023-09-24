import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Config from "../../utils/config";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const initialState = {
    email: "",
    password: "",
  };

  const [{ email, password }, setState] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(Config.requestToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    // console.log(data);
    if (data.access) {
      var decoded = jwtDecode(data.access);
      const userId = decoded.user_id;
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("userId", userId);
      navigate("/dashboard");
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (
      data.detail === "No active account found with the given credentials"
    ) {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-[100%] w-[100%] mainContainer min-h-[100vh] light:mainContainerLight relative overflow-hidden">
        <div className="w-[30rem]  z-10 flex flex-col items-center mt-[10rem]">
          <div className="titleRed">Login</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center mt-[2rem]"
          >
            <div className="inputLight light:inputLight">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="inputLight light:inputLight">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="primaryButton light:primaryButtonlight mt-[2rem] px-[3rem] py-[0.7rem]"
            >
              Login
            </button>
          </form>
        </div>
        <div className="gradCircle -bottom-[20rem]"></div>
        <div className="gradCircle -right-[20rem]"></div>
        <div className="gradCircle -left-[20rem]"></div>
      </div>
    </>
  );
};

export default Login;
