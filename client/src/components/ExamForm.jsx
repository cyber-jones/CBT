import { examDuration } from "../data/static";

function ExamForm({
  time,
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
      <div className="text-center">
        <h2 className="text-blue-500 text-lg lg:text-2xl">Create Exam</h2>
        <p className="text-white text-sm lg:text-lg">
          CPS102: Introduction to programming II
        </p>
        <p className="text-red-500 text-sm lg:text-lg">Unit: 2</p>
        <select
          className="select"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          <option>Set exam duration</option>
          { examDuration.map(duration => (
            <option key={duration.value} value={duration.value}>{duration.name}</option>
          ))}
        </select>
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
                  updateQuestion(index, "correctAnswer", Number(e.target.value))
                }
                required
              >
                <option>Select an answer</option>
                {q.options.map((_, i) => (
                  <option key={i} value={i}>
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
        <button type="button" className="btn btn-primary" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit" className="btn btn-success">
          Create Exam
        </button>
      </div>
    </form>
  );
}

export default ExamForm;
