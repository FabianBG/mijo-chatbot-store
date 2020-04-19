const express = require("express");
const { exec } = require("child_process");
const slugify = require("slugify");
const validateBody = require("./bodyValidator");

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
  exec(`./scripts/build-site ${req.body.phone}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`${new Date()} [ERROR] build-site: ${error}`);
      return;
    }
    console.log(`${new Date()} [INFO] BUILD END OUTPUT`, stdout, stderr);

    res.status(200).send({ updated: true });
  });
});

router.post("/store/add-product", function(req, res) {
  console.log(`${new Date()} [INFO] BUILD END OUTPUT`, stdout, stderr);
  exec(
    `cd sites/${req.body.id}; npx gatsby build --prefix-paths; cp public/* ../../public/${req.body.id}/`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`${new Date()} [INFO] BUILD END OUTPUT`, stdout, stderr);
      res.send({ ok: true });
    }
  );
});

router.post("/store/delete-product", function(req, res) {
  exec(
    `cd sites/${req.body.id}; npx gatsby build --prefix-paths; cp public/* ../../public/${req.body.id}/`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.send({ ok: true });
    }
  );
});

router.post("/store/process-order", function(req, res) {
  console.log(req);
  res.status(200).send({ ok: true });
});

module.exports = router;
