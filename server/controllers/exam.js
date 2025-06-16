const Exam = require("../models/Exam");
const Submission = require("../models/Submission");


const createExam = async (req, res, next) => {
  const { course, questions } = req.body;
  try {
    const user = await require("../models/User").findById(req.user.id);
    if (!user.canSetExams)
      return res.status(403).json({ message: "No permission to set exams" });

    const exam = new Exam({ course, lecturer: req.user.id, questions });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    next(err);
  }
};

const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().populate("course").populate("lecturer");
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

const submitExam = async (req, res, next) => {
  const { examId, answers, studentId } = req.body;
  try {
    const submission = new Submission({
      exam: examId,
      student: studentId,
      answers
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
};

const getSubmissionLecturer = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      exam: { $in: await Exam.find({ lecturer: req.params.id }) },
    })
      .populate("exam", "course questions")
      .populate("student", "email");
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};

const getResults = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      student: req.params.id,
      approved: true,
    }).populate("exam", "course");
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};

const gradeSubmission = async (req, res, next) => {
  const { score, lecturerId } = req.body;
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });
    const exam = await Exam.findById(submission.exam);
    if (exam.lecturer.toString() !== lecturerId)
      return res.status(403).json({ message: "Not authorized" });
    submission.score = score;
    await submission.save();
    res.json(submission);
  } catch (err) {
    next(err);
  }
};

const getSubmissionAdmin = async (req, res, next) => {
  try {
    const submissions = await Submission.find()
      .populate("exam", "course")
      .populate("student", "email")
      .populate("lecturer", "email");
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};

const approveResult = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });
    submission.approved = true;
    await submission.save();
    res.json(submission);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createExam,
  getAllExams,
  submitExam,
  getSubmissionLecturer,
  gradeSubmission,
  getResults,
  getSubmissionAdmin,
  approveResult,
};
