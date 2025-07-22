import Exam from "../models/Exam.js";
import Submission from "../models/Submission.js";
import User from "../models/User.js";

export const createExam = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.canSetExams)
      return res.status(403).json({ message: "No permission to set exams" });

    const exam = new Exam({ ...req.body });
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
    const exams = await Exam.find()
      .lean()
      .populate("course")
      .populate("lecturer")
      .populate("department");
    res.status(200).json({ success: true, exams });
  } catch (err) {
    next(err);
  }
};

export const getLecturerExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({ lecturer: req.params.id })
      .lean()
      .populate("course")
      .populate("lecturer")
      .populate("department");
    res.status(200).json({ success: true, exams });
  } catch (err) {
    next(err);
  }
};

export const getStudentExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({ department: req.params.id })
      .lean()
      .populate("course")
      .populate("lecturer")
      .populate("department");
      
    res.status(200).json({ success: true, exams });
  } catch (err) {
    next(err);
  }
};

export const getCourseExam = async (req, res, next) => {
  try {
    const exam = await Exam.findOne({ course: req.params.id })
      .lean()
      .populate("course")
      .populate("lecturer")
      .populate("department");

    res.status(200).json({ success: true, exam });
  } catch (err) {
    next(err);
  }
};

export const getExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .lean()
      .populate("course")
      .populate("lecturer")
      .populate("department");
    res.status(200).json({ success: true, exam });
  } catch (err) {
    next(err);
  }
};

export const updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(205).json({ success: true, exam });
  } catch (err) {
    next(err);
  }
};

export const toggleExamStart = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);

    exam.written = true;
    if (exam.start) exam.start = false;
    else exam.start = true;

    await exam.save();

    let message = null;
    if (exam.start) message = "Exam opened for students";
    else message = "Exam closed!";

    res.status(200).json({ success: true, message, exam });
  } catch (err) {
    next(err);
  }
};

export const DeleteExam = async (req, res, next) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const submitExam = async (req, res, next) => {
  try {
    const submission = new Submission({
      ...req.body,
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

export const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find()
      .lean()
      .populate("exam")
      .populate("student")
      .populate("lecturer");
    res.status(200).json({ success: true, submissions });
  } catch (err) {
    next(err);
  }
};

export const getSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .lean()
      .populate("exam")
      .populate("student")
      .populate("lecturer");
    res.status(200).json({ success: true, submission });
  } catch (err) {
    next(err);
  }
};

export const getSubmissionsByExamId = async (req, res, next) => {
  try {
    const submission = await Submission.findOne({
      exam: req.params.id,
    })
      .lean()
      .populate("exam")
      .populate("student")
      .populate("lecturer");
    res.status(200).json({ success: true, submission });
  } catch (err) {
    next(err);
  }
};

export const getSubmissionsByStudentId = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      student: req.params.id,
    })
      .lean()
      .populate("exam")
      .populate("student")
      .populate("lecturer");
    res.status(200).json({ success: true, submissions });
  } catch (err) {
    next(err);
  }
};

export const getSubmissionsByLecturerId = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      exam: { $in: await Exam.find({ lecturer: req.params.id }) },
    })
      .lean()
      .populate("exam")
      .populate("student")
      .populate("lecturer");
    res.status(200).json({ success: true, submissions });
  } catch (err) {
    next(err);
  }
};

export const getSubmissionsByCourseId = async (req, res, next) => {
  try {
    const submissions = await Submission.find({
      exam: { $in: await Exam.find({ course: req.params.id }) },
    })
      .lean()
      .populate("exam")
      .populate("student")
      .populate("lecturer");
    res.status(200).json({ success: true, submissions });
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
