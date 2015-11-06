define([
    'BaseWidgetView',
    'text!templates/counter-template.html'
], function(BaseWidgetView, template) {
    var CounterWidgetView = BaseWidgetView.extend({
        tagName: 'div',
        className: 'update',
        template: template,
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.html(this.template);
            this.$el.append(this.editView.render().el);
            return this;
        }
    });
    return CounterWidgetView;
});