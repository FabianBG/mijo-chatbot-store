const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = twilio(accountSid, authToken);

const sendMessage = (body, to, chanel = "whatsapp") => {
  client.messages
    .create({
      body,
      from: `${chanel}:+14155238886`,
      to: `${chanel}:${to}`,
    })
    .then((message) => console.log(message.sid))
    .done();
};

const handleTwilioMessageRequest = (request) => {
  const memory = JSON.parse(request.Memory);
  const data = memory.twilio.collected_data;
  const [chanel, phone] = request.UserIdentifier.split(":");
  let body = {};
  if (memory && data) {
    for (const collector of Object.keys(data)) {
      const answers = data[collector].answers;
      for (const field of Object.keys(answers)) {
        if (answers[field].media) {
          body[field] = answers[field].media;
        } else {
          body[field] = answers[field].answer;
        }
      }
    }
  }
  return {
    ...body,
    chanel,
    phone,
  };
};

const handleTwilioMessageFieldRequest = (request, fields) => {
  const [chanel, phone] = request.UserIdentifier.split(":");
  let body = {};
  for (const field of fields) {
    const value = request[`Field_${field}_Value`];
    if (value) {
      body[field] = value;
    }
  }
  return {
    ...body,
    chanel,
    phone,
  };
};

const validateRequest = (twilioSignature, url, params) => {
  return twilio.validateRequest(authToken, twilioSignature, url, params);
};

module.exports = {
  sendMessage,
  validateRequest,
  handleTwilioMessageRequest,
  handleTwilioMessageFieldRequest,
};
