define(['BaseWidgetView'], function(BaseWidgetView) {
    var BlockquoteWidgetView = BaseWidgetView.extend({
        tagName: 'blockquote',
        placeHolder: 'Відредагуй цитату просто натиснувши на текст правою кнопкою миші',
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
    return BlockquoteWidgetView;
});