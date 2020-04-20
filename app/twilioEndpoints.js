const express = require("express");
const { exec } = require("child_process");
const slugify = require("slugify");
const validateBody = require("./bodyValidator");
const fs = require("fs");
const twilio = require("../integration/twilio");
const domain = require("../domain");

var router = express.Router();

router.post("/store/create-site", async function(req, res) {
  const data = twilio.handleTwilioMessageRequest(req.body);
  const { id, phone } = data;
  try {
    const hasSite = await domain.hasSiteCreated(phone);
    let response;

    if (hasSite) {
      twilio.sendMessage(
        "You already has a site. Try adding new products.",
        phone
      );
      respose = {};
    } else {
      response = await domain.createSite(id, phone);
      twilio.sendMessage(
        "The site is already created, add some products and send a message with *MIJO publish it* to publish it.",
        phone
      );
    }
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/store/build-site", async function(req, res) {
  const data = twilio.handleTwilioMessageRequest(req.body);
  const { phone } = data;
  try {
    const response = await domain.buildSite(phone, phone);
    twilio.sendMessage("The site is ready and updated :D", phone);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    twilio.sendMessage(
      "Something wnet wrong :(, try again in a few minutes.",
      phone
    );
    res.status(500).send(error);
  }
});

router.post("/store/add-product", async function(req, res) {
  const data = twilio.handleTwilioMessageRequest(req.body);
  const { name, phone, price } = data;
  try {
    const response = await domain.addProduct(name, phone, price);
    twilio.sendMessage(
      "The product is created, send a message with *MIJO publish it* to publish it.",
      phone
    );
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    twilio.sendMessage(
      "Something wnet wrong :(, try again in a few minutes.",
      phone
    );
    res.status(500).send(error);
  }
});

router.post("/store/delete-product", async function(req, res) {
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
    id: (value) => (!value ? "id is required" : false),
  });

  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }

  const { id, phone } = req.body;
  try {
    const response = await domain.deleteProduct(id, phone);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    twilio.sendMessage(
      "Something wnet wrong :(, try again in a few minutes.",
      phone
    );
    res.status(500).send(error);
  }
});

module.exports = router;
