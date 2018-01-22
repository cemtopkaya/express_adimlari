let express = require('express');
let app = express();
var timeout = require('connect-timeout');

let morgan = require('morgan');
let port = 8080;
let routes = require('./routes');

if (app.get('env') == 'production') {
    app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400 }, stream: __dirname + './morgan.log' }));
} else {
    console.log('dev olacak');
    
    app.use(morgan('dev', {
        skip: function (req, res) {
            console.log('buraya düştü');
            
            return res.statusCode == 200
        }, stream: process.stderr
    }));
}

app.use(timeout(3000));
app.use((req, res, next) => {

    console.log('Timeout oldu!!!!!');

    if (!req.timedout)
        next();
    else
        res.send(`Timeout oldu yahu!!!!`);
});

app.use("/", routes.karsilama)
    .use("/kisi", routes.kisi)
    .use("/urun", routes.urun)
    .use((q, r, n) => {
        r.send('404 oldu')
    });

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing