import { Navigate, Outlet, useLocation } from "react-router-dom";
import { cbt_url } from "../../utils/SD";
import useAppContext from "../../hooks/useAppContext";

const IsAuth = ({ roles }) => {
  const { authUser, token } = useAppContext();
  const location = useLocation();
  const isAuth = authUser && roles.includes(authUser?.role);

  return roles.length > 0  ? (
    isAuth ? (
      <Outlet />
    ) : (
      <Navigate to={cbt_url.login} state={{ from: location }} />
    )
  ) : authUser !== null && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to={cbt_url.login} state={{ from: location }} />
  );
};

export default IsAuth;
