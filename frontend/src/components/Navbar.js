import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full py-4 px-4 md:px-24 lg:px-48 flex justify-between items-center">
        <h1 className="w-fit text-3xl md:text-4xl font-poppins-bd">
          <Link to="/">Todo List</Link>
        </h1>
        <nav>
          {user && (
            <div className="flex justify-between items-center gap-3">
              <button
                className="py-2 px-4 rounded-md border-2 hover:border-blue-700 hover:text-blue-800 font-poppins-sb duration-150 active:ring active:ring-blue-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="flex justify-between items-center gap-6 font-poppins-md">
              <Link
                to="/login"
                className="border-b-2 border-b-white hover:border-b-black duration-150"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border-b-2 border-b-white hover:border-b-black duration-150"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
