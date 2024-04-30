const twilio = require('twilio');

// Replace these placeholders with your Twilio account credentials and phone number
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken =process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber =process.env.TWILIO_PHONE_NUMBER ;

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Export the client and Twilio phone number
module.exports = {
    client,
    twilioPhoneNumber,
};
