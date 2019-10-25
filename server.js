var express = require("express");
var app = express();
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/token", (req, res, next) => {
    getToken.then((token) => {
        res.json({ status: 1, token: token });
    })
});

var getToken = new Promise((resolve, reject) => {
    var authConfig = {};
    var googleAuth = require('google-auto-auth');
    var auth = googleAuth(authConfig);
    authConfig.keyFilename = 'auth.json';
    authConfig.scopes = [
        'https://www.googleapis.com/auth/iam',
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/devstorage.full_control',
    ];

    auth.authorizeRequest({}, function (err, authorizedReqOpts) {
        //console.log(JSON.stringify(authorizedReqOpts));
    });

    auth.getToken(function (err, token) {
        resolve(token);
    });
})
