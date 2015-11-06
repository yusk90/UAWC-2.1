define(['BaseWidgetView'], function(BaseWidgetView) {
    var VideoWidgetView = BaseWidgetView.extend({
        tagName: 'div',
        events: {
            'click .edit': 'changeVideo'
        },
        defaultVideo: '<iframe width="560" height="315" src="https://www.youtube.com/embed/et8xNAc2ic8" frameborder="0" allowfullscreen></iframe>',
        initialize: function () {
            var videoURL = prompt('Введіть код відео:', this.defaultVideo);
            this.$el.append(videoURL);
            this.baseInitialize();
        },
        render: function () {
            this.$el.append(this.editView.render().el);
            return this;
        },
        changeVideo: function () {
            this.attr('src', prompt('Введіть код відео:', this.defaultVideo));
        }
    });
    return VideoWidgetView;
});