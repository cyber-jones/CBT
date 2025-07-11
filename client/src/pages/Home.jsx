import { useNavigate } from "react-router-dom";
import { cbt_url } from "../utils/SD";


const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center font-mono">
      <div className="w-11/12 md:w-10/12 h-10/12 bg-green-600 flex flex-col justify-center items-center gap-2 rounded-2xl">
        <p className="text-2xl md:text-3xl lg:text-5xl mb-3">Welcome To <span className="text-green-900">FUO</span> CBT</p>
        <img className="h-3/12 w-11/12 md:w-auto md:h-5/12 rounded-3xl" src="/Images/osogboM.jpg" alt="fuo logo" />
        <button onClick={() => navigate(cbt_url.login)} className="btn btn-soft btn-success text-lg w-9/12 lg:w-2/12 mt-5 py-5">Login</button>
      </div>
    </div>
  );
};

export default Home;
