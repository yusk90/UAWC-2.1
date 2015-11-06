define(['BaseWidgetView'], function(BaseWidgetView) {
    var HrWidgetView = BaseWidgetView.extend({
        tagName: 'hr',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.append(this.editView.render().el);
            return this;
        }
    });
    return HrWidgetView;
});