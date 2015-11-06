define(['BaseView', 'users'], function(BaseView, users) {
    var ThemesView = BaseView.extend({
        el: '#themes-widget',
        events: {
            'click .grids__block': 'proceed'
        },
        proceed: function (e) {
            e.preventDefault();
            var currrentPath = window.location.pathname,
                user = users.findWhere({
                    'userEmail': _.getCookieValue('user') || localStorage.getItem('user')
                });

            function getThemeConfig() {
                var $elem = $(e.currentTarget),
                    themeConfig = {};

                function serializeData(elem, index) {
                    themeConfig['row' + (index + 1)] = elem;
                }

                _.each($elem.data('theme-config').split('-'), serializeData);
                return themeConfig;
            }

            user.set('themeConfig', getThemeConfig()).save();

            window.location.pathname = currrentPath.replace(
                'theme.html', 'constructor.html'
            );
        }
    });
    return ThemesView;
});