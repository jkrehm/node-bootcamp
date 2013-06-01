
/**
* Module dependencies.
*/

require('node-monkey').start({
    host: '127.0.0.1'
});

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, hbs = require('hbs')
, socket = require('socket.io');

var app = express();

// all environments
app.set('env', 'development');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var pubdir = __dirname + '/public';

app.get('/', function (req, res) {
    res.sendfile(pubdir + '/index.html');
});
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// Socket.io
io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// setInterval(function() {
//     count += 1;
//     socket.emit('count', count);
// }, 1000);