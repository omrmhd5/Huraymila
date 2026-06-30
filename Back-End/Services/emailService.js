const nodemailer = require("nodemailer");

/**
 * Configure standard nodemailer transport
 */
const getMailTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: parseInt(port) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Sends a password reset email to the user
 * @param {string} toEmail - Recipient email
 * @param {string} resetLink - Unhashed reset link URL
 */
const sendResetPasswordEmail = async (toEmail, resetLink) => {
  const subject = "مدينة حريملاء الصحية - إعادة تعيين كلمة المرور | Healthy Huraymila - Reset Password";
  
  const textContent = `
أهلاً بك،
لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في برنامج مدينة حريملاء الصحية.

يرجى الضغط على الرابط التالي لإعادة تعيين كلمة المرور (الرابط صالح لمدة ساعة واحدة):
${resetLink}

إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني.

---

Hello,
We received a request to reset your password for your account in the Healthy Huraymila Program.

Please click the following link to reset your password (valid for 1 hour):
${resetLink}

If you did not request this, please ignore this email.
`;

  const htmlContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #186a3b; text-align: center;">مدينة حريملاء الصحية</h2>
      <p>أهلاً بك،</p>
      <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في برنامج مدينة حريملاء الصحية.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #186a3b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">إعادة تعيين كلمة المرور</a>
      </div>
      <p style="font-size: 14px; color: #555;">الرابط أعلاه صالح لمدة ساعة واحدة فقط من تاريخ استلام الرسالة.</p>
      <p style="font-size: 12px; color: #999; border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 20px;">
        إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني.
      </p>
      
      <div dir="ltr" style="margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: left;">
        <h3 style="color: #186a3b;">Healthy Huraymila Program</h3>
        <p>Hello,</p>
        <p>We received a request to reset your password for your account in the Healthy Huraymila Program.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #186a3b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 14px; color: #555;">This link is valid for 1 hour only.</p>
      </div>
    </div>
  `;

  const transport = getMailTransport();

  if (!transport) {
    // Falls back to console output if SMTP credentials are not configured
    console.log("\n========================================================");
    console.log("⚠️  [EMAIL SERVICE: DEVELOPER FALLBACK]");
    console.log(`TO: ${toEmail}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`RESET LINK: ${resetLink}`);
    console.log("========================================================\n");
    return {
      success: true,
      fallback: true,
      message: "Email logged to console fallback in development mode",
    };
  }

  const mailOptions = {
    from: `"مدينة حريملاء الصحية" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: subject,
    text: textContent,
    html: htmlContent,
  };

  try {
    const info = await transport.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email via SMTP:", error);
    throw new Error("Failed to send reset email");
  }
};

module.exports = {
  sendResetPasswordEmail,
};
