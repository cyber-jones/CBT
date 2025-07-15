import { Navigate, Outlet } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import { cbt_url } from "../../utils/SD";



const IsLoggedIn = () => {
  const { token, authUser } = useAppContext();

  return authUser == null &&
    token == null ? (
    <Outlet />
  ) : (
    <Navigate to={cbt_url.dashboard} />
  );
};

export default IsLoggedIn;
