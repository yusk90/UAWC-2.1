define(['BaseWidgetView'], function(BaseWidgetView) {
    var H1WidgetView = BaseWidgetView.extend({
        tagName: 'h1',
        placeHolder: 'Відредагуй заголовок просто натиснувши на текст правою кнопкою миші',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.attr('contenteditable', true);
            this.$el.html(this.placeHolder);
            this.$el.append(this.editView.render().el);
            return this;
        }
    });
    return H1WidgetView;
});