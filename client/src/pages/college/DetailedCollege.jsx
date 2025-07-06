import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { cbt_url } from "../../utils/SD";

const collegeDetails = {
  id: 1,
  name: "College Of Natural And Applied Sciences",
  code: "CONAS",
};

const DetailedCollege = () => {
    const navigate = useNavigate();
    const handleAction = () => {
  alert("Done!");
};
  return (
    <div className="p-6 h-full bg-green-100 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-lg lg:text-3xl font-bold mb-4 text-gray-800">
          {collegeDetails.name}
        </h1>

        <div className="space-y-4">
          <div>
            <span className="text-lg font-semibold text-gray-700">code: </span>
            <span className="text-gray-800">{collegeDetails.code}</span>
          </div>

          {/* <div>
            <h2 className="text-lg font-semibold text-gray-700">college</h2>
            <p className="text-gray-800">{collegeDetails.college}</p>
          </div> */}

          <div className="flex gap-3">
            <button onClick={() => navigate(cbt_url.updateCollege+"/"+collegeDetails.id)} className="btn btn-success">Update</button>
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
