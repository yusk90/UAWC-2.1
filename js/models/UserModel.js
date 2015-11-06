define(['backbone'], function(Backbone) {
    var UserModel = Backbone.Model.extend({
        defaults: {
            userName: '',
            userEmail: '',
            userPassword: '',
            userCategory: '',
            themeConfig: null
        },
        validate: function (attrs) {
            var errors = {};
            if (!attrs.userName) {
                errors.userName = 'Введіть ім\'я:';
            }
            if (!attrs.userEmail) {
                errors.userEmail = 'Введіть e-mail: ';
            } else if (!_.isEmail(attrs.userEmail)) {
                errors.userEmail = 'Невалідний e-mail:';
            } /*else if (app.users.get(attrs.userEmail)) {
                errors.userEmail = 'Користувач з таким e-mail вже зареєстрований:';
            }*/
            if (!attrs.userPassword) {
                errors.userPassword = 'Введіть пароль:';
            }
            if (attrs.userCategory === 'Категорія') {
                errors.userCategory = 'Виберіть категорію:';
            }
            return _.isEmpty(errors) ? false : errors;
        }
    });
    return UserModel;
});
