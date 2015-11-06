define([
    'BaseWidgetView',
    'text!templates/social-like-template.html'
], function(BaseWidgetView, template) {
    var SocialLikeWidgetView = BaseWidgetView.extend({
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
    return SocialLikeWidgetView;
});