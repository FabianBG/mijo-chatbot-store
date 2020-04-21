const express = require("express");
const { exec } = require("child_process");
const slugify = require("slugify");
const validateBody = require("./bodyValidator");
const twilio = require("../integration/twilio");
const fs = require("fs");

var router = express.Router();

router.post("/store/place-order", function(req, res) {
  console.log(req.body);
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
    site: (value) => (!value ? "site is required" : false),
    email: (value) => (!value ? "email is required" : false),
    products: (value) =>
      !value || value.length === 0 ? "no products added" : false,
  });

  if (Object.keys(errors).length > 0) {
    return res.status(500).send(errors);
  }

  const phone = fs.readFileSync(`./sites/${req.body.site}`);

  const products = req.body.products
    .map(({ id, name, quantity, price, currency, subTotal }) => {
      return `${name} X ${quantity} = ${subTotal}
      `;
    })
    .join("");
  const message = `A new order has been placed:
  Mail: ${req.body.email}
  Phone: ${req.body.phone}
  Products: 
      ${products}
  `;
  twilio.sendMessage(message, phone);
  res.status(200).send({});
});

module.exports = router;
