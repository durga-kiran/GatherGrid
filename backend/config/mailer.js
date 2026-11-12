
import nodemailer from "nodemailer";

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_FROM) {
  throw new Error("Email configuration is missing. Check your .env file.");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
export const verifyMailerConnection = async () => {
  try {
    await transporter.verify();
    console.log("Gmail SMTP connection successful!");
    return true;
  } catch (error) {
    console.error("Gmail SMTP connection failed:", error.message);
    return false;
  }
};

// Send verification OTP
export const sendVerificationEmail = async (email, name, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Venuza" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Venuza - Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 25px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #d9a04f;">Welcome to Venuza!</h2>
          <p>Hello ${name},</p>
          <p>Use the following verification code to activate your account:</p>
          <h1 style="text-align: center; letter-spacing: 8px; color: #d9a04f;">
            ${otp}
          </h1>
          <p>This verification code expires in 10 minutes.</p>
          <p>If you did not create this account, please ignore this email.</p>
          <p>Thank you,<br />Venuza Team</p>
        </div>
      `,
    });

    console.log("Verification email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

export default transporter;
