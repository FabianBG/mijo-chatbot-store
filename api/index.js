const express = require("express");
const { exec } = require("child_process");
const slugify = require("slugify");
const validateBody = require("./bodyValidator");
const fs = require("fs");

var router = express.Router();

router.post("/store/create-site", function(req, res) {
  const errors = validateBody(req.body, {
    id: (value) => (!value ? "ID is required" : false),
    phone: (value) => (!value ? "phone is required" : false),
  });

  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }

  const { id, phone, theme } = req.body;
  const siteName = slugify(id.toLowerCase());
  exec(
    `./scripts/create-site ${theme || "theme-1"} ${phone} ${siteName}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`${new Date()} [ERROR] create-site: ${error}`);
        return;
      }
      res.status(200).send({ siteName });
    }
  );
});

router.post("/store/build-site", function(req, res) {
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
  });
  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }
  console.log(`${new Date()} [INFO] BUILD INIT SITE-ID=${req.id}`);
  exec(
    `./scripts/build-site-cache ${req.body.phone}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`${new Date()} [ERROR] build-site: ${error}`);
        return;
      }
      console.log(`${new Date()} [INFO] BUILD END OUTPUT`, stdout, stderr);

      res.status(200).send({ updated: true });
    }
  );
});

router.post("/store/add-product", function(req, res) {
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
    name: (value) => (!value ? "name is required" : false),
    price: (value) => (!value ? "price is required" : false),
  });

  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }

  const { name, phone, price } = req.body;
  const productSlug = slugify(name.toLowerCase());
  const dataFolder = `sites/${phone}/src/data/products`;

  fs.readdir(dataFolder, function(err, items) {
    let nextID = items.length;
    for (let i = 0; i < items.length; i++) {
      const id = parseInt(items[i].split(".")[0]);
      if (i !== id) {
        nextID = i;
        break;
      }
    }
    // TODO: manage images from chatbot
    const image = "default.png";
    const content = `
    {
      "id": "MJPR-${nextID}",
      "name": "${name}",
      "price": "${price}",
      "description": "",
      "currency": "$",
      "image": "${image}"
    }
    `;
    fs.writeFileSync(
      `${dataFolder}/${nextID}.${productSlug}.json`,
      content,
      "UTF-8"
    );
    res.status(200).send(content);
  });
});

router.post("/store/delete-product", function(req, res) {
  const errors = validateBody(req.body, {
    phone: (value) => (!value ? "phone is required" : false),
    id: (value) => (!value ? "id is required" : false),
  });

  if (Object.keys(errors).length > 0) {
    res.status(500).send(errors);
  }

  const { id, phone } = req.body;
  const dataFolder = `sites/${phone}/src/data/products`;

  fs.readdir(dataFolder, function(err, items) {
    for (let i = 0; i < items.length; i++) {
      const fileID = items[i].split(".")[0];
      if (id === fileID) {
        fs.unlinkSync(`${dataFolder}/${items[i]}`);
        break;
      }
    }
    res.status(200).send({ deleted: true });
  });
});

router.post("/store/process-order", function(req, res) {
  console.log(req.body);
  res.status(200).send(req.body);
});

module.exports = router;
