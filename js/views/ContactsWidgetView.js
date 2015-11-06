define([
    'BaseWidgetView',
    'text!templates/contacts-template.html'
], function(BaseWidgetView, template) {
    var ContactsWidgetView = BaseWidgetView.extend({
        tagName: 'div',
        elemHTML: template,
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.attr('contenteditable', true);
            this.$el.html(this.elemHTML);
            this.$el.append(this.editView.render().el);
            return this;
        }
    });
    return ContactsWidgetView;
});