define(['BaseWidgetView'], function(BaseWidgetView) {
    var WellWidgetView = BaseWidgetView.extend({
        tagName: 'p',
        className: 'paragraph-block',
        placeHolder: 'В цьому блоці опишіть детально, що Ви маєте на меті, ' +
                    'яка Ваша ціль, заради чого Ви створюєте данну сторінку. ' +
                    'Це краще дасть зрозуміти відвідувачам Вашої сторінки, ' +
                    'яку мета ви поставили перед собою, і заради чого вони ' +
                    'мають допомогти Вам.',
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
    return WellWidgetView;
});