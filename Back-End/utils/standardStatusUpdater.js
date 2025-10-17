const Standard = require("../Models/Standard");
const Submission = require("../Models/Submission");

/**
 * Update standard status and progress based on submissions from assigned agencies
 * @param {Number} standardNumber - The standard number to update
 */
const updateStandardStatus = async (standardNumber) => {
  try {
    // Get the standard with assigned agencies
    const standard = await Standard.findOne({ number: standardNumber });
    if (!standard) {
      // Standard not found
      return;
    }

    // Get all submissions for this standard from assigned agencies
    const submissions = await Submission.find({
      standardNumber,
      agency: { $in: standard.assigned_agencies },
    });

    const totalAgencies = standard.assigned_agencies.length;

    if (totalAgencies === 0) {
      // No agencies assigned, keep default status
      return;
    }

    // Determine overall standard status and progress based on ALL submissions
    let overallStatus;
    let progress;

    if (submissions.length === 0) {
      // No submissions at all
      overallStatus = "didnt_submit";
      progress = 0;
    } else {
      // Check the status of all submissions
      const approvedCount = submissions.filter(
        (sub) => sub.status === "approved"
      ).length;
      const rejectedCount = submissions.filter(
        (sub) => sub.status === "rejected"
      ).length;
      const totalSubmissions = submissions.length;

      // Calculate progress based on approved submissions
      progress = Math.round((approvedCount / totalSubmissions) * 100);

      if (approvedCount === totalSubmissions) {
        // All submissions are approved
        overallStatus = "approved";
      } else if (rejectedCount === totalSubmissions) {
        // All submissions are rejected
        overallStatus = "rejected";
      } else {
        // Mix of statuses OR some pending submissions
        overallStatus = "pending_approval";
      }
    }

    // Create status counts for logging
    const statusCounts = {
      approved: submissions.filter((sub) => sub.status === "approved").length,
      rejected: submissions.filter((sub) => sub.status === "rejected").length,
      pending: submissions.filter((sub) => sub.status === "pending").length,
      total_submissions: submissions.length,
    };

    // Update the standard
    await Standard.findOneAndUpdate(
      { number: standardNumber },
      {
        status: overallStatus,
        progress: progress,
        updatedAt: new Date(),
      },
      { new: true }
    );

    // Log: Updated Standard status and progress
    // Log: Submission breakdown

    return {
      standardNumber,
      status: overallStatus,
      progress,
      statusCounts,
    };
  } catch (error) {
    // Error updating standard status
    throw error;
  }
};

/**
 * Update multiple standards based on an array of standard numbers
 * @param {Number[]} standardNumbers - Array of standard numbers to update
 */
const updateMultipleStandardsStatus = async (standardNumbers) => {
  const results = [];

  for (const standardNumber of standardNumbers) {
    try {
      const result = await updateStandardStatus(standardNumber);
      if (result) {
        results.push(result);
      }
    } catch (error) {
      // Failed to update standard
    }
  }

  return results;
};

module.exports = {
  updateStandardStatus,
  updateMultipleStandardsStatus,
};
