import { useEffect, useState } from "react";
import Loading from "../Loading";
import { Outlet } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh";
import useAppContext from "../../hooks/useAppContext";
import { toast } from "react-toastify";

const PersistAuth = () => {
  const { token } = useAppContext();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refresh();
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    !token ? fetchData() : setLoading(false);
  }, [refresh, token]);

  return <>{!loading ? <Outlet /> : <Loading />}</>;
};

export default PersistAuth;
