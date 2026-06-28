const Agency = require("../Models/Agency");
const SmsLog = require("../Models/SmsLog");

// Normalizer to convert 05XXXXX to 9665XXXXX (standard KSA format)
const normalizePhoneNumber = (phone) => {
  if (!phone) return null;
  // Remove any spaces or non-digit characters
  let digits = phone.replace(/\D/g, "");
  
  // Basic filter for fake repetitive numbers like 9999999 or 1111111
  if (/(\d)\1{5,}/.test(digits)) {
    return null;
  }

  if (digits.startsWith("05") && digits.length === 10) {
    return "966" + digits.substring(1);
  }
  if (digits.startsWith("5") && digits.length === 9) {
    return "966" + digits;
  }
  if (digits.startsWith("9665") && digits.length === 12) {
    return digits;
  }
  
  return null; // Invalid KSA number
};

// Send Broadcast SMS (Mocked for 4Jawaly)
const sendBroadcast = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message body cannot be empty",
      });
    }

    // 1. Fetch all agencies
    const agencies = await Agency.find();
    
    // 2. Extract and normalize phone numbers
    const phoneNumbers = [];
    agencies.forEach((agency) => {
      if (agency.contactPerson && agency.contactPerson.phoneNumber) {
        const normalized = normalizePhoneNumber(agency.contactPerson.phoneNumber);
        if (normalized && !phoneNumbers.includes(normalized)) {
          phoneNumbers.push(normalized);
        }
      }
    });

    if (phoneNumbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid agency phone numbers found to send SMS.",
      });
    }

    // 3. Log the attempt
    const newLog = new SmsLog({
      sender: req.user.governorId, // Available from governorOnly middleware
      messageBody: message,
      recipientCount: phoneNumbers.length,
      status: "pending",
    });
    await newLog.save();

    let data;

    // 4. MOCK MODE (Active)
    /* --- TAQNYAT LIVE API (Commented out for now) ---
    const apiKey = process.env.TAQNYAT_API_KEY;
    const senderName = process.env.TAQNYAT_SENDER_NAME || "Taqnyat.sa";

    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      throw new Error("Taqnyat API Key is missing. Please configure it in the .env file.");
    }

    const response = await fetch('https://api.taqnyat.sa/v1/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        recipients: phoneNumbers,
        body: message,
        sender: senderName
      })
    });
    
    data = await response.json();

    if (!response.ok || (data.statusCode && data.statusCode !== 201 && data.statusCode !== 200)) {
      console.error("Taqnyat Error Payload:", data);
      throw new Error(data.message || data.error || "فشل إرسال الرسالة من المزود");
    }
    -------------------------------------------------- */

    // Mock Response
    await new Promise(resolve => setTimeout(resolve, 1000));
    data = {
      messages: "Mock Success",
      job_id: `mock-job-${Date.now()}`
    };

    // 5. Update Log Status
    newLog.status = "completed";
    newLog.successfulDeliveries = phoneNumbers.length;
    newLog.apiResponse = data;
    await newLog.save();

    res.status(200).json({
      success: true,
      message: `تم إرسال الرسالة بنجاح إلى ${phoneNumbers.length} جهة.`,
      data: {
        recipients: phoneNumbers.length,
        logId: newLog._id,
      }
    });

  } catch (error) {
    console.error("SMS Broadcast Error:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إرسال الرسائل النصية",
      error: error.message,
    });
  }
};

// Get SMS Logs
const getSmsLogs = async (req, res) => {
  try {
    const logs = await SmsLog.find().sort({ createdAt: -1 }).populate("sender", "email");
    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching SMS logs",
      error: error.message,
    });
  }
};

module.exports = {
  sendBroadcast,
  getSmsLogs,
};
