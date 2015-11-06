define(['backbone'], function(Backbone) {
    var BaseView = Backbone.View.extend({
        clearErrors: function () {
            this.$('.sidebar__error').remove();
        },
        showErrors: function (model, errors) {
            _.each(errors, function (message, name) {
                this.$('#' + _.hyphen(name))
                    .before('<div class="sidebar__error">' + message +  '</div>');
            }, this);
        }
    });
    return BaseView;
});
