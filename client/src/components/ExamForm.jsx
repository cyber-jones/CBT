import { examDuration } from "../data/static";

function ExamForm({
  time,
  instruction,
  setInstruction,
  course,
  totalMark,
  setTotalMark,
  loading,
  setTime,
  deleteQuestion,
  questions,
  addQuestion,
  updateQuestion,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-10/12 flex flex-col border justify-center items-center gap-7"
    >
      <div className="text-center w-11/12 md:w-10/12 flex flex-col justify-center items-center gap-1">
        <h2 className="text-blue-500 text-lg lg:text-2xl">Create Exam</h2>
        <p className="text-white text-sm lg:text-lg">
          {course?.code}: {course?.title}
        </p>
        <p className="text-red-500 text-sm lg:text-lg">Unit: {course?.unit}</p>
        <div className="grid grid-cols-2 grid-rows-1 w-full md:w-8/12 place-content-center place-items-center">
          <select
            className="select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option>Set exam duration</option>
            {examDuration.map((duration) => (
              <option key={duration.value} value={duration.value}>
                {duration.name}
              </option>
            ))}
          </select>
          <input
            required
            type="number"
            value={totalMark}
            placeholder="Total Mark"
            className="input"
            onChange={(e) => setTotalMark(e.target.value)}
          />
        </div>
        <input
          required
          type="text"
          value={instruction}
          placeholder="Exam instruction"
          className="input w-full lg:w-10/12"
          onChange={(e) => setInstruction(e.target.value)}
        />
      </div>
      <div className="w-11/12 lg:w-10/12 flex flex-col gap-5">
        {questions.map((q, index) => (
          <div key={index} className="w-full flex flex-col border p-2">
            <div className="w-full">
              <input
                required
                type="text"
                value={q.question}
                placeholder={`Question ${index + 1}`}
                className="input w-full"
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
              />
            </div>
            <div className="w-full grid grid-cols-2 grid-rows-2 place-content-center place-items-center">
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => updateQuestion(index, i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="input w-11/12"
                  required
                />
              ))}
            </div>
            <div className="w-full flex justify-center items-center">
              <select
                className="select"
                value={q.correctAnswer}
                onChange={(e) =>
                  updateQuestion(index, "correctAnswer", e.target.value)
                }
                required
              >
                <option>Select an answer</option>
                {q.options.map((option, i) => (
                  <option key={i} value={option}>
                    Option {i + 1}
                  </option>
                ))}
              </select>
              <i
                className="bi bi-trash text-lg text-red-700 cursor-pointer ml-7"
                onClick={() => deleteQuestion(index)}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div className="w-10/12 grid grid-cols-2 grid-rows-1 gap-4 mb-2">
        <button
          disabled={loading}
          type="button"
          className="btn btn-primary"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button disabled={loading} type="submit" className="btn btn-success">
          {loading ? "..." : "Create Exam"}
        </button>
      </div>
    </form>
  );
}

export default ExamForm;
