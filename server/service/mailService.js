import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID, // Environment variable for the email ID
    pass: process.env.PASS_KEY, // Environment variable for the password
  },
});

export default async function sendOtpToMail(to, sub, msg) {

  try {
    // Await the sendMail function as it's asynchronous
    await transporter.sendMail({
      from: process.env.EMAIL_ID, // Ensure the email sender is specified
      to: to,
      subject: sub,
      html: msg,
    });
    return true; // Return true on success
  } catch (error) {
    console.error("Failed to send email:", error); // Log the error for debugging
    return false; // Return false on failure
  }
}

