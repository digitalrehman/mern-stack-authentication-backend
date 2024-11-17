
import nodemailer from "nodemailer";
import 'dotenv/config'

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdulrehmanarain1018@gmail.com",
    pass: "zhefgzfrvqsbnspl"
  }
})


const senders = {
  email: "abdulrehmanarain1018@gmail.com",
  name: "Rehman Official",
};

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: `${senders.name} <${senders.email}>`,
    to: to,
    subject: subject,
    html: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  })
}