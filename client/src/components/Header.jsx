import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { cbt_url } from "../utils/SD";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

const Header = () => {
  const { setAuthUser, setUser, setToken } = useAppContext();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleLogOut = async () => {
     try {
          const res = await axiosPrivate.get("/auth/logout");
    
          if (res.status !== 204)
            return toast.error(res.data?.message || res.statusText);
          
          setAuthUser(null);
          setUser(null);
          setToken(null);
          navigate(cbt_url.login);
        } catch (err) {
          toast.error(err.response?.data?.message || err.message);
        }
      }
  return (
    <div className="navbar shadow-sm bg-green-800">
      <div className="flex-1">
        <Link to={cbt_url.home} className="btn btn-ghost text-xl">CBT</Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => navigate(cbt_url.profile)} className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogOut}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
