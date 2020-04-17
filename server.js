var express = require('express');
var bodyParser = require('body-parser');
const { exec } = require('child_process');

var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// configure body parser for handle request body
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());

// Configure static folder of sites
app.use(express.static('public'));

app.post("/create-site", function (req, res) {
    console.log(req.body);
    exec(`cp -r templates/theme-1 sites/${req.body.id}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send({ "ok": true });
    });
});

app.post("/deploy", function (req, res) {
    exec(`cd sites/${req.body.id}; npx gatsby build --prefix-paths; cp public/* ../../public/${req.body.id}/`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send({ "ok": true });
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});