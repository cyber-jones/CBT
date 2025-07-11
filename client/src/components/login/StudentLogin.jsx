
const StudentLogin = () => {
  return (
    <form>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Student Login</legend>

        <label className="label">Matric No</label>
        <input type="idNumber" className="input" placeholder="Matric No" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-success mt-4">Login</button>
      </fieldset>
    </form>
  );
};

export default StudentLogin;
