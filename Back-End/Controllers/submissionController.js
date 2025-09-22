const Submission = require("../Models/Submission");
const Agency = require("../Models/Agency");

// Get submissions by standard number
const getSubmissionsByStandardNumber = async (req, res) => {
  try {
    const { standardNumber } = req.params;

    const submissions = await Submission.find({ standardNumber })
      .populate("agency", "name name_ar")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error: error.message,
    });
  }
};

// Update submission status
const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("agency", "name name_ar");

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.json({
      success: true,
      message: "Submission status updated successfully",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating submission status",
      error: error.message,
    });
  }
};

module.exports = {
  getSubmissionsByStandardNumber,
  updateSubmissionStatus,
};
