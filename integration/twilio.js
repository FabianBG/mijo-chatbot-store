const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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
  return {
    ...body,
    chanel,
    phone,
  };
};

module.exports = { sendMessage, handleTwilioMessageRequest };
