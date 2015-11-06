define(['BaseWidgetView'], function(BaseWidgetView) {
    var MapWidgetView = BaseWidgetView.extend({
        tagName: 'div',
        events: {
            'click .edit': 'changeMap'
        },
        defaultMap: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387156.4344233849!2d-74.26055252223698!3d40.70349300078751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2z0J3RjNGOLdCZ0L7RgNC6LCDQodCo0JA!5e0!3m2!1sru!2sua!4v1445112839721" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>',
        initialize: function () {
            var mapURL = prompt('Введіть код карти:', this.defaultMap);
            this.$el.append(mapURL);
            this.baseInitialize();
        },
        render: function () {
            this.$el.append(this.editView.render().el);
            return this;
        },
        changeMap: function () {
            this.attr('src', prompt('Введіть код карти:', this.defaultMap));
        }
    });
    return MapWidgetView;
});