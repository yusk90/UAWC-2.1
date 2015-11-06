define(['BaseView'], function(BaseView) {
    var EditWidgetView = BaseView.extend({
        tagName: 'div',
        className: 'hover',
        events: {
            'click .delete': 'close'
        },
        template: '<i class="hover__full"></i>' +
                    '<ul class="hover__buttons">' +
                    '<li class="hover__item edit"></li>' +
                    '<li class="hover__item copy"></li>' +
                    '<li class="hover__item delete"></li>' +
                    '</ul>',
        render: function () {
            this.$el.attr('contenteditable', false);
            this.$el.html(this.template);
            return this;
        },
        close: function () {
            this.trigger('delete-widget');
        }
    });
    return EditWidgetView;
});