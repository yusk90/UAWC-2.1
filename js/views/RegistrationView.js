define(['BaseView',
        'UserModel',
        'users'
], function(BaseView, UserModel, users) {
    var RegistrationView = BaseView.extend({
        el: '#registration-form',
        events: {
            'click #submit-form': 'submit'
        },
        initialize: function () {
            this.model = new UserModel();
            this.listenTo(this.model, 'invalid', this.showErrors);
        },
        submit: function (e) {
            var $formFields = this.$('.sidebar__input'),
                formData = {},
                currrentPath = window.location.pathname;

            e.preventDefault();
            this.clearErrors();

            function serializeFormData(input) {
                formData[_.capitalize(input.id)] = input.value;
            }
            _.each($formFields, serializeFormData, this);
            this.model.set(formData);
            if (this.model.isValid()) {
                this.stopListening(this.model);
                this.$('input.sidebar__input').val('');
                users.create(this.model);
                this.$('.sidebar__submit')
                    .after('<div class="sidebar__success">Дякуємо за реєстрацію! Через 5 секунд Вас буде переадресовано на сторінку входу</div>');
                setTimeout(function () {
                    if (window.location.pathname.indexOf('index.html') === -1) {
                        window.location.pathname = 'sign-in.html';
                    } else {
                        window.location.pathname = currrentPath.replace(
                            'index.html', 'sign-in.html'
                        );
                    }
                }, 5000);
            }
        }
    });
    return RegistrationView;
});
