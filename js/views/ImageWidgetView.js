define(['BaseWidgetView'], function(BaseWidgetView) {
    var ImageWidgetView = BaseWidgetView.extend({
        tagName: 'div',
        className: 'image-block',
        events: {
            'click .edit': 'changeImage'
        },
        initialize: function () {
            var $imgElement = $(document.createElement('img')),
                imgSrc = prompt('Введіть URL зображення', 'http://lorempixel.com/700/500');
            $imgElement.addClass('img-responsive image-block__picture');
            $imgElement.attr('src', imgSrc);
            this.$el.append($imgElement);
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
    return ImageWidgetView;
});