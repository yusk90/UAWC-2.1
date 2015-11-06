define(['underscore'], function(_) {
    _.mixin({
        capitalize: function (selector) {
            var selectorArr = selector.split('-');
            return selectorArr.reduce(function (accum, word) {
                return accum + word[0].toUpperCase() + word.slice(1);
            });
        },
        hyphen: function (selector) {
            return selector.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },
        isEmail: function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
        getCookieValue: function (cookieName) {
            var cookiesArray = document.cookie.split('; '),
                cookieValue;
            cookiesArray.forEach(function(elem) {
                if (elem.search(cookieName) !== -1) {
                    cookieValue = elem.replace(cookieName + '=', '');
                }
            });
            return cookieValue;
        },
        deleteCookie: function (name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    });
});
