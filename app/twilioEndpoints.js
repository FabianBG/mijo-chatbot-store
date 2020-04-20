const express = require("express");
const { exec } = require("child_process");
const slugify = require("slugify");
const validateBody = require("./bodyValidator");
const fs = require("fs");
const twilio = require("../integration/twilio");
const fileDownloader = require("./fileDownloader");
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
    twilio.sendMessage(
      "Something wnet wrong, try again in a few minutes. :(",
      phone
    );
    res.status(500).send(error);
  }
});

router.post("/store/build-site", async function(req, res) {
  const data = twilio.handleTwilioMessageRequest(req.body);
  const { phone, confirm } = data;
  twilio.sendMessage(
    `The site is updating it gonna take a few minutes.`,
    phone
  );
  try {
    const products = domain.getSiteProducts(phone);
    if (products.length === 0) {
      twilio.sendMessage(
        `The site has no products :O please add some. Just text me to add a product.`,
        phone
      );
      res.status(200).send({});
    } else {
      const response = await domain.buildSite(phone, phone);
      const site = `${process.env.APP_URL}/${domain.getSiteName(phone)}`;
      twilio.sendMessage(`The site is ready and updated :D. ${site}`, phone);
      res.status(200).send(response);
    }
  } catch (error) {
    console.error(error);
    twilio.sendMessage(
      "Something wnet wrong, try again in a few minutes. :(",
      phone
    );
    res.status(500).send(error);
  }
});

router.post("/store/add-product", async function(req, res) {
  const data = twilio.handleTwilioMessageRequest(req.body);
  const { name, phone, price, image } = data;
  const imageName = `${new Date().getTime()}.${image.type.split("/")[1]}`;
  twilio.sendMessage(`Creating the product on your site.`, phone);
  await fileDownloader(
    image.url,
    `sites/${phone}/src/images/product-images/${imageName}`
  );

  try {
    const response = await domain.addProduct(name, phone, price, imageName);
    twilio.sendMessage(
      "The product is created, send a message with *MIJO publish it* to publish it.",
      phone
    );
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    twilio.sendMessage(
      "Something wnet wrong, try again in a few minutes. :(",
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
      "Something wnet wrong, try again in a few minutes. :(",
      phone
    );
    res.status(500).send(error);
  }
});

module.exports = router;
