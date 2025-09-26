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
      console.log(`Standard ${standardNumber} not found`);
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

    // Count submissions by status
    const statusCounts = {
      approved: 0,
      rejected: 0,
      pending: 0,
      didnt_submit: 0,
    };

    // Create a map of agencies that have submitted
    const agenciesWithSubmissions = new Set();

    submissions.forEach((submission) => {
      agenciesWithSubmissions.add(submission.agency.toString());

      if (submission.status === "approved") {
        statusCounts.approved++;
      } else if (submission.status === "rejected") {
        statusCounts.rejected++;
      } else if (submission.status === "pending") {
        statusCounts.pending++;
      }
    });

    // Count agencies that haven't submitted anything
    statusCounts.didnt_submit = totalAgencies - agenciesWithSubmissions.size;

    // Calculate progress (percentage of agencies that have approved submissions)
    const progress = Math.round((statusCounts.approved / totalAgencies) * 100);

    // Determine overall standard status based on submission statuses
    let overallStatus;

    if (statusCounts.approved === totalAgencies) {
      // All agencies have approved submissions
      overallStatus = "approved";
    } else if (
      statusCounts.approved > 0 &&
      statusCounts.pending === 0 &&
      statusCounts.rejected === 0 &&
      statusCounts.didnt_submit === 0
    ) {
      // Some approved, no pending/rejected/unsubmitted
      overallStatus = "approved";
    } else if (statusCounts.pending > 0) {
      // Any pending submissions
      overallStatus = "pending_approval";
    } else if (statusCounts.approved > 0) {
      // Some approved, but also some rejected or unsubmitted
      overallStatus = "pending_approval";
    } else if (statusCounts.rejected > 0 && statusCounts.didnt_submit === 0) {
      // All submitted but all rejected
      overallStatus = "rejected";
    } else {
      // Default case - not all submitted or mix of statuses
      overallStatus = "didnt_submit";
    }

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

    console.log(
      `Updated Standard ${standardNumber}: status=${overallStatus}, progress=${progress}%`
    );
    console.log(
      `Breakdown: approved=${statusCounts.approved}, pending=${statusCounts.pending}, rejected=${statusCounts.rejected}, didnt_submit=${statusCounts.didnt_submit}`
    );

    return {
      standardNumber,
      status: overallStatus,
      progress,
      statusCounts,
    };
  } catch (error) {
    console.error(`Error updating standard ${standardNumber} status:`, error);
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
      console.error(`Failed to update standard ${standardNumber}:`, error);
    }
  }

  return results;
};

module.exports = {
  updateStandardStatus,
  updateMultipleStandardsStatus,
};
