import Exam from "../models/Exam.js";
import Submission from "../models/Submission.js";

export const createExam = async (req, res, next) => {
  const { course, questions } = req.body;
  try {
    const user = await require("../models/User").findById(req.user.id);
    if (!user.canSetExams)
      return res.status(403).json({ message: "No permission to set exams" });

    const exam = new Exam({ course, lecturer: req.user.id, questions });
    await exam.save();
    res
      .status(201)
      .json({ success: true, message: "Exam created successfully", exam });
  } catch (err) {
    next(err);
  }
};

export const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().populate("course").populate("lecturer");
    res.status(200).json({ success: true, exams });
  } catch (err) {
    next(err);
  }
};

export const getExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("course")
      .populate("lecturer");
    res.status(200).json({ success: true, exam });
  } catch (err) {
    next(err);
  }
};

export const submitExam = async (req, res, next) => {
  const { examId, answers, studentId } = req.body;
  try {
    const submission = new Submission({
      exam: examId,
      student: studentId,
      answers,
    });
    await submission.save();
    res.status(201).json({
      success: true,
      message: "Exam submitted successfully",
      submission,
    });
  } catch (err) {
    next(err);
  }
};

export const getSubmissionLecturer = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      exam: { $in: await Exam.find({ lecturer: req.params.id }) },
    })
      .populate("exam", "course questions")
      .populate("student", "email");
    res.status(200).json({ success: true, submissions });
  } catch (err) {
    next(err);
  }
};

export const getResults = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      student: req.params.id,
      approved: true,
    }).populate("exam", "course");
    res.status(200).json({ success: true, submissions });
  } catch (err) {
    next(err);
  }
};

// export const gradeSubmission = async (req, res, next) => {
//   const { score, lecturerId } = req.body;
//   try {
//     const submission = await Submission.findById(req.params.id);
//     if (!submission)
//       return res.status(404).json({ message: "Submission not found" });
//     const exam = await Exam.findById(submission.exam);
//     if (exam.lecturer.toString() !== lecturerId)
//       return res.status(403).json({ message: "Not authorized" });
//     submission.score = score;
//     await submission.save();
//     res.status().json(submission);
//   } catch (err) {
//     next(err);
//   }
// };

export const getSubmissionAdmin = async (req, res, next) => {
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

export const approveResult = async (req, res, next) => {
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
