import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,

  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASS_KEY, 
  },
});
export default function sentOtpToMail(to, sub, msg) {
  try {
    transporter.sendMail({
      to: to,
      subject: sub,
      html: msg,
    });
    return true;
  } catch (error) {
    throw error.message;
  }
}
