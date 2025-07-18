import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { cbt_url } from "../../utils/SD";
import useCollege from "../../hooks/useCollege";

const DetailedCollege = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { colleges: college } = useCollege(id);
 

    const handleAction = () => {
  alert("Done!");
};
  return (
    <div className="p-6 h-full bg-base-200 font-sans">
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-lg shadow">
        <h1 className="text-lg lg:text-3xl font-bold mb-4">
          {college?.name}
        </h1>

        <div className="space-y-4">
          <div>
            <span className="text-lg font-semibold">code: </span>
            <span>{college?.code}</span>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate(cbt_url.updateCollege+"/"+college?._id)} className="btn btn-success">Update</button>
            <Modal
              action={"Delete"}
              type={"error"}
              handleAction={handleAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCollege;
