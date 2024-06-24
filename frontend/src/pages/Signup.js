import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="w-full p-4 h-screen overflow-hidden flex justify-center items-center bg-[#eeeeee]">
      <Navbar />
      <form className="w-96 p-4 rounded-xl shadow-md bg-white">
        <h1 className="flex-none text-center text-4xl font-poppins-bd mt-4 mb-10">
          Signup
        </h1>
        <div className="font-poppins-md flex flex-col gap-6">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="py-2 px-4 text-sm font-bold text-gray-700 bg-[#eeeeee] outline-none rounded focus:ring focus:ring-blue-400 duration-150"
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              className="py-2 px-4 text-sm font-bold text-gray-700 bg-[#eeeeee] outline-none rounded focus:ring focus:ring-blue-400 duration-150"
              type="password"
              placeholder="Example#123"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="text-center mt-4">
            <button
              disabled={loading}
              onClick={handleSignup}
              className="w-fit py-2 px-4 rounded-lg bg-blue-600 text-white font-poppins-bd hover:bg-blue-700 active:bg-blue-900 active:ring active:ring-blue-400 duration-150"
            >
              Signup
            </button>
            {error && (
              <div className="mt-4 border-red-600 bg-red-200 text-red-900 rounded py-3">
                {error}
              </div>
            )}
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
