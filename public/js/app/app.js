define([

    'backbone',
    'socket',
    'handlebars',
    'handlebars-helpers',
    'app/templates'

], function(

    Backbone,
    io,
    Handlebars,
    helpers,
    templates

) { 
    var socket = null,
        events = _.extend({}, Backbone.Events);


    var ConsoleCode = Backbone.Model.extend({

        broadcast: function() {
            socket.emit('broadcast', this.toJSON() );
        },

        defaults: {
            'code': ''
        },

        initialize: function() {
            var model = this;

            socket.on('update', function(data) {
                model.set('code', data.code);

                events.trigger('code:updated');
            });
        },

        url: '/coding'

    });


    var User = Backbone.Model.extend({

        defaults: {
            'id': ''
        }

    });


    var Users = Backbone.Collection.extend({

        model: User,
        url: '/users'

        // getUsers: function() {
        //     socket.emit('getusers', function(data) {
        //         console.log(data);
        //     });
        // }

    });


    var ConsoleView = Backbone.View.extend({

        el: $('.ui-console'),

        broadcast: function() {

            this.model.set('code', this.$el.find('textarea').val());
            this.model.broadcast();

        },

        events: {
            'keyup': 'broadcast'
        },

        initialize: function() {

            events.on('code:updated', this.update, this);

        },

        render: function() {    
            this.$el.html( templates['app/console']( this.model.toJSON() ) );

            return this;
        },

        update: function() {
            this.$el.find('textarea').val( this.model.get('code') );
        }
    });


    var UserView = Backbone.View.extend({

        el: $('.users'),
        tagName: 'li',

        initialize: function() {

            this.listenTo(this.model, 'change', this.render);

        },

        render: function() {
            var debug = this.model.toJSON();
            this.$el.append( templates['app/users']( this.model.toJSON() ) );

            return this;
        }
    });


    var users = new Users();


    var App = Backbone.View.extend({

        el: $('body'),

        initialize: function() {

            // Start socket.io
            if (socket === null) {
                socket = io.connect();
            }

            this.listenTo(users, 'add', this.addUser);
            socket.on('connected', function(data) {

                users.add(data);

            });

            socket.on('disconnected', function(data) {

                // Clear user list and re-fetch
                $('.users').empty();
                users.reset();
                users.fetch();

            });

            users.fetch();

            this.render();

        },

        render: function() {

            var view = new ConsoleView({ model: new ConsoleCode() });
            view.render();

            return this;

        },

        addUser: function(user) {

            var view = new UserView({ model: user });
            view.render();
            // view.$el.append( view.render().el );
        }

    });

    return App;
});