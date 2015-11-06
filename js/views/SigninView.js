define(['BaseView', 'users'], function(BaseView, users) {
    var SigninView = BaseView.extend({
        el: '#signin-form',
        events: {
            'click #submit-form': 'validateUser'
        },
        initialize: function () {
            _.deleteCookie('user');
            // Если не работает cookies:
            localStorage.removeItem('user');
        },
        validateUser: function (e) {
            e.preventDefault();
            var email = this.$('#user-email').val(),
                password = this.$('#user-password').val(),
                userModel = users.findWhere({'userEmail': email}),
                errors = {};

            this.clearErrors();

            if (!email) {
                errors.userEmail = 'Введіть e-mail:';
            } else if (!_.isEmail(email)) {
                errors.userEmail = 'Введіть валідний e-mail:';
            } else if (!userModel) {
                errors.userEmail = 'Такого e-mail не має в базі:';
            }
            if (!password) {
                errors.userPassword = 'Введіть пароль:';
            } else if (userModel) {
                if (password !== userModel.get('userPassword')) {
                    errors.userPassword = 'Невірний пароль:';
                }
            }
            if (_.isEmpty(errors)) {
                this.onSuccess(email);
            } else {
                this.showErrors(null, errors);
            }
        },
        onSuccess: function (email) {
            var currrentPath = window.location.pathname;
            document.cookie = 'user=' + email;
            // Если не работает cookies:
            localStorage.setItem('user', email);
            window.location.pathname = currrentPath.replace(
                'sign-in.html', 'theme.html'
            );
        }
    });
    return SigninView;
});