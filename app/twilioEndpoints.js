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
  const { id, phone } = data.body;
  try {
    const response = await domain.createSite(id, phone);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/store/build-site", async function(req, res) {
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
    id: (value) => (!value ? "id is required" : false),
  });
  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }
  const { id, phone } = req.body;

  try {
    const response = await domain.buildSite(id, phone);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/store/add-product", async function(req, res) {
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
    name: (value) => (!value ? "name is required" : false),
    price: (value) => (!value ? "price is required" : false),
  });

  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }

  const { name, phone, price } = req.body;
  try {
    const response = await domain.addProduct(name, phone, price);
    res.status(200).send(response);
  } catch (error) {
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
    res.status(500).send(error);
  }
});

module.exports = router;
