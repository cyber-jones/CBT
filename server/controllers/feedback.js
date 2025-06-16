const Feedback = require('../models/Feedback');


const submitFeedback = async (req, res, next) => {
  const { category, comment } = req.body;
  try {
    const feedback = new Feedback({
      user: req.user.id,
      stakeholderType: req.user.role,
      category,
      comment,
    });
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    next(err);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

const getFeedbackSummary = async (req, res, next) => {
  try {
    const summary = await Feedback.aggregate([
      {
        $group: {
          _id: { category: "$category", stakeholderType: "$stakeholderType" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(summary);
  } catch (err) {
    next(err);
  }
};


module.exports = { getFeedback, getFeedbackSummary, submitFeedback }
