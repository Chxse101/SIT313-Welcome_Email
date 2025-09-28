const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  const msg = {
    to: email,
    from: 'pranavnarayanann@gmail.com',
    subject: 'Welcome to the Daily Insider!',
    text: 'Thanks for subscribing to our daily insider!',
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2>Welcome to <span style="color: #0073e6;">DEV@Deakin</span>!</h2>
        <p>Thanks for subscribing to our <strong>Daily Insider</strong> newsletter.</p>
        <p>We’re excited to have you with us. Expect updates, insights, and more—straight to your inbox.</p>
        <p>Cheers,<br>DEV@Deakin Team</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: 'Welcome email sent successfully!' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to send welcome email. Please try again later.' });
  }
});

app.listen(PORT);