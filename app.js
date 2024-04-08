// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Create an Express application
const app = express();

// Configure bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submission
app.post("/send-email", (req, res) => {
  // Extract form data
  const { name, email, message } = req.body;

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
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
  console.log(`Server is running on port ${PORT}`);
});
