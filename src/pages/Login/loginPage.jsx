import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { baseURL } from "../../utils/config";
import jwtDecode from "jwt-decode";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const initialState = {
    username: "",
    password: "",
  };

  const [{ username, password }, setState] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${baseURL}/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    console.log(response);
    const data = await response.json();
    if (response.status === 205 || response.status === 204 || data.isSuccess) {
      var decoded = jwtDecode(data.access);
      const userId = decoded.user_id;
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("userId", userId);
    }
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <div className="flex flex-col items-center h-[100%] w-[100%] mainContainer min-h-[100vh] light:mainContainerLight relative overflow-hidden">
        <div className="w-[30rem]  z-10 flex flex-col items-center mt-[10rem]">
          <div className="text-3xl text-gradient-red text-bold">Login</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center mt-[2rem]"
          >
            <div className="inputLight light:inputLight">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="inputLight light:inputLight">
              <label>Password</label>
              <input
                type="text"
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
