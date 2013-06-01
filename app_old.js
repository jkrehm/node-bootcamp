require('node-monkey').start();

var http = require('http'),
    fs = require('fs'),
    hbs = require('handlebars');

http.createServer(function(req, res) {
    fs.readFile('templates/main.hbs', { encoding: 'utf8' }, function(err, data) {
        if (err) throw err;
        var debug = hbs.compile(data);
        console.log(debug);
        res.end( data );
    });
}).listen(3000);