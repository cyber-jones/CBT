const StudentLogin = ({ handleChange }) => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Student Login</legend>

      <label className="label">Matric No</label>
      <input
        required
        id="idNumber"
        type="idNumber"
        className="input"
        placeholder="FUO/**/****"
        onChange={handleChange}
      />

      <label className="label">Password</label>
      <input
        required
        id="password"
        type="password"
        className="input"
        placeholder="*******"
        onChange={handleChange}
      />

      <button className="btn btn-success mt-4">Login</button>
    </fieldset>
  );
};

export default StudentLogin;
