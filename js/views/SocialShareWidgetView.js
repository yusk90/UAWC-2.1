define([
    'BaseWidgetView',
    'text!templates/social-share-template.html'
], function(BaseWidgetView, template) {
    var SocialShareWidgetView = BaseWidgetView.extend({
        tagName: 'div',
        elemHTML: template,
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.html(this.elemHTML);
            this.$el.append(this.editView.render().el);
            return this;
        }
    });
    return SocialShareWidgetView;
});