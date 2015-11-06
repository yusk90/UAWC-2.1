define(['backbone',
        'UserModel',
        'localstorage'
], function(Backbone, UserModel) {
    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,
        localStorage: new Backbone.LocalStorage('Users'),
        initialize: function () {
            this.fetch({reset: true});
        }
    });
    return UsersCollection;
});
