import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useAppContext from "../../hooks/useAppContext";
import { toast } from "react-toastify";

const IsAuth = ({ roles }) => {
  const { authUser, token } = useAppContext();
  const location = useLocation();
  const isAuth = authUser?.roles && roles.includes(authUser?.role);
  const navigate = useNavigate();

  const handleRedirect = () => {
    toast.error("Unauthorized!");
    navigate(cbt_url.dashboard);
  }
  return roles.length > 0 ? (
    isAuth ? (
      <Outlet />
    ) : (
      handleRedirect()
    )
  ) : authUser !== null && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to={cbt_url.login} state={{ from: location }} />
  );
};

export default IsAuth;
