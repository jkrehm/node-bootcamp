require.config({
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'socket': {
            exports: 'io'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['underscore','jquery']
        }
    },
    paths: {
        'backbone': 'vendor/backbone-min',
        'bootstrap.min': 'vendor/bootstrap.min',
        'domready': 'vendor/domReady',
        'handlebars': 'vendor/handlebars.runtime',
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
            'vendor/jquery-2.0.1.min'
        ],
        'moment': 'vendor/moment.min',
        'socket': '/socket.io/socket.io',
        'underscore': 'vendor/underscore-min',
    }
});


require(['domready', 'app/app'], function(domReady, App) {

    domReady(function() {
        new App();
    });

});
