const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const welcomeEmail = (user) => {
  try {
    const templatePath = path.join(__dirname, "emailTemplate.ejs");
    const emailParams = {
      from: "CadeP",
      to: user.email,
      subject: "Welcome to CadeP",
      html: ejs.render(fs.readFileSync(templatePath, "utf8"), {
        companyName: 'Cadep Flowers',
        userName: user.name,
        loginUrl: 'https://cadep.com/login'      }),
    };
    const response = transporter.sendMail(emailParams);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { welcomeEmail };