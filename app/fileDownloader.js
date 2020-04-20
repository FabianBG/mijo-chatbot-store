const fs = require("fs");
const request = require("request");

const downloadFile = function(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function(err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", resolve);
    });
  });
};

module.exports = downloadFile;
