define(['BaseView', 'EditWidgetView'], function(BaseView, EditWidgetView) {
    var BaseWidgetView = BaseView.extend({
        baseInitialize: function () {
            this.editView = new EditWidgetView();
            this.listenTo(this.editView, 'delete-widget', this.close)
                .listenTo(this.editView, 'edit-widget', this.edit);
            this.$el.on('contextmenu', this.preventRightClick);
            this.$el.on('mouseenter', this.addPadding);
            this.$el.on('mouseleave', this.deletePadding);
        },
        preventRightClick: function () {
            return false;
        },
        addPadding: function () {
            $(this).addClass('padding-on-hover');
        },
        deletePadding: function () {
            $(this).removeClass('padding-on-hover');
        },
        edit: function () {
            /*this.$el.trigger({
                type: 'mousedown',
                which: 3
            })*/
        },
        close: function () {
            if (this.editView) {
                this.editView.remove();
                this.editView.unbind();
            }
            $(this).off();
            this.remove();
            this.unbind();
        }
    });
    return BaseWidgetView;
});