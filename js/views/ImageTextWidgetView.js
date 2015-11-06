define(['BaseWidgetView'], function(BaseWidgetView) {
    var ImageTextWidgetView = BaseWidgetView.extend({
        tagName: 'figure',
        className: 'image-block',
        events: {
            'click .edit': 'changeImage'
        },
        placeHolder: 'Текст до зображення',
        initialize: function () {
            var $imgElement = $(document.createElement('img')),
                $caption = $(document.createElement('figcaption'));
            $imgElement.addClass('img-responsive image-block__picture');
            $caption.attr('contenteditable', true);
            $caption.addClass('image-block__caption');
            $imgElement.attr('src', prompt('Введіть URL зображення', 'http://lorempixel.com/700/500'));
            this.$el.append($imgElement);
            this.$el.append($caption.html(this.placeHolder));
            this.baseInitialize();
        },
        render: function () {
            this.$el.append(this.editView.render().el);
            return this;
        },
        changeImage: function () {
            this.$('img').attr('src', prompt('Введіть URL зображення', 'http://lorempixel.com/700/500'));
        }
    });
    return ImageTextWidgetView;
});