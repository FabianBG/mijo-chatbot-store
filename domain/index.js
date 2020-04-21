const { exec } = require("child_process");
const slugify = require("slugify");
const fs = require("fs");

const createSite = (id, phone, theme) => {
  const siteName = slugify(id.toLowerCase());
  return new Promise((resolve, reject) => {
    console.log(`${new Date()} [INFO] create site ${phone}`);
    exec(
      `./scripts/create-site ${theme || "theme-1"} ${phone} ${siteName}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`${new Date()} [ERROR] create-site: ${error}`);
          return reject(error);
        }
        resolve({ siteName });
      }
    );
  });
};

const hasSiteCreated = (phone) => {
  const dataFolder = `sites/${phone}`;
  return new Promise((resolve, reject) => {
    resolve(fs.existsSync(dataFolder));
  });
};

const getSiteName = (phone) => {
  const dataFolder = `sites/${phone}/site-name`;
  return fs.readFileSync(dataFolder, "utf8");
};

const getSiteProducts = (phone) => {
  const dataFolder = `sites/${phone}/src/data/products`;
  return fs.readdirSync(dataFolder).map((item) => {
    return `${item.split(".")[0]}-${item.split(".")[1]}`;
  });
};

const buildSite = (id, phone) => {
  console.log(`${new Date()} [INFO] BUILD INIT SITE=${id}`);
  return new Promise((resolve, reject) => {
    exec(`./scripts/build-site-cache ${phone}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${new Date()} [ERROR] build-site: ${error}`);
        return reject(error);
      }
      console.log(`${new Date()} [INFO] BUILD END OUTPUT`, stdout, stderr);
      resolve({ updated: true });
    });
  });
};

const addProduct = (name, phone, price, image) => {
  const productSlug = slugify(name.toLowerCase());
  const dataFolder = `sites/${phone}/src/data/products`;

  return new Promise((resolve, reject) => {
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
      const imageName = image || "default.png";
      const content = `
      {
        "id": "MJPR-${nextID}",
        "name": "${name}",
        "price": "${price}",
        "description": "",
        "currency": "$",
        "image": "${imageName}"
      }
      `;
      fs.writeFileSync(
        `${dataFolder}/${nextID}.${productSlug}.json`,
        content,
        "UTF-8"
      );
      resolve(JSON.parse(content));
    });
  });
};

const deleteProduct = (id, phone) => {
  const dataFolder = `sites/${phone}/src/data/products`;
  return new Promise((resolve, reject) => {
    fs.readdir(dataFolder, function(err, items) {
      for (let i = 0; i < items.length; i++) {
        const fileID = items[i].split(".")[0];
        if (id === fileID) {
          fs.unlinkSync(`${dataFolder}/${items[i]}`);
          break;
        }
      }
      resolve({ deleted: true });
    });
  });
};

const processOrder = (order) => {
  console.log(order);
  return order;
};

module.exports = {
  createSite,
  hasSiteCreated,
  getSiteName,
  getSiteProducts,
  buildSite,
  addProduct,
  deleteProduct,
  processOrder,
};
