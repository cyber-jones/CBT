import { useContext } from "react"
import AppContext from "../context/AuthContext";



const useAppContext = () => {
    return useContext(AppContext);
}


export default useAppContext;