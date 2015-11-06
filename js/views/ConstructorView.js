define([
    'text!templates/theme-template.html',
    'BaseView',
    'users',
    'dragula',
    'BlockquoteWidgetView',
    'ButtonWidgetView',
    'ContactsWidgetView',
    'CounterWidgetView',
    'FooterWidgetView',
    'GalleryWidgetView',
    'H1WidgetView',
    'H2WidgetView',
    'HrWidgetView',
    'ImageTextWidgetView',
    'ImageWidgetView',
    'MapWidgetView',
    'MenuWidgetView',
    'ParagraphWidgetView',
    'SocialLikeWidgetView',
    'SocialShareWidgetView',
    'VideoWidgetView',
    'WellWidgetView'
], function(themeTemplate, BaseView, users, dragula, BlockquoteWidgetView, ButtonWidgetView, ContactsWidgetView, CounterWidgetView, FooterWidgetView, GalleryWidgetView, H1WidgetView, H2WidgetView, HrWidgetView, ImageTextWidgetView, ImageWidgetView, MapWidgetView, MenuWidgetView, ParagraphWidgetView, SocialLikeWidgetView, SocialShareWidgetView, VideoWidgetView, WellWidgetView) {
    var ConstructorView = BaseView.extend({
        el: '#constructor-widget',
        events: {
            'click': 'editElement'
        },
        template: _.template(themeTemplate),
        initialize: function () {
            var user = users.findWhere({
                    'userEmail': _.getCookieValue('user') || localStorage.getItem('user')
                }),
                $dropContainers,
                drake;
            this.$el.append(this.template(user.get('themeConfig')));
            this.$('#constructor-row-1 > div > div').append(new H2WidgetView().render().el);
            this.$('#constructor-row-2 > div > div').each(function (index, elem) {
                $(elem).append(new ParagraphWidgetView().render().el);
            });
            this.$('#constructor-row-3 > div > div').each(function (index, elem) {
                $(elem).append(new ParagraphWidgetView().render().el)
                    .append(new CounterWidgetView().render().el)
                    .append(new ButtonWidgetView().render().el);
            });
            drake = dragula([document.querySelector('#constructor-elements')], {
                copy: function (el, source) {
                    return source.id === 'constructor-elements';
                }
            });
            $dropContainers = this.$('div').not('.row, .container');
            $dropContainers.each(function(index, container) {
                drake.containers.push(container);
            });
            drake.on('drop', function (el, target, source, sibling) {
                var $selectedElement = $(el),
                    $selectedElemFunction = $selectedElement.data('function');
                if ($selectedElemFunction == 'addH1') {
                    var h1Widget = new H1WidgetView().render().el;
                    $selectedElement.replaceWith(h1Widget);
                }
                if ($selectedElemFunction == 'addH2') {
                    var h2Widget = new H2WidgetView().render().el;
                    $selectedElement.replaceWith(h2Widget);
                }
                if ($selectedElemFunction == 'addBlockquote') {
                    var bqWidget = new BlockquoteWidgetView().render().el;
                    $selectedElement.replaceWith(bqWidget);
                }
                if ($selectedElemFunction == 'addParagraph') {
                    var paragraphWidget = new ParagraphWidgetView().render().el;
                    $selectedElement.replaceWith(paragraphWidget);
                }
                if ($selectedElemFunction == 'addWell') {
                    var wellWidget = new WellWidgetView().render().el;
                    $selectedElement.replaceWith(wellWidget);
                }
                if ($selectedElemFunction == 'addHr') {
                    var hrWidget = new HrWidgetView().render().el;
                    $selectedElement.replaceWith(hrWidget);
                }
                if ($selectedElemFunction == 'addImage') {
                    var imageWidget = new ImageWidgetView().render().el;
                    $selectedElement.replaceWith(imageWidget);
                }
                if ($selectedElemFunction == 'addImageWithText') {
                    var imageTextWidget = new ImageTextWidgetView().render().el;
                    $selectedElement.replaceWith(imageTextWidget);
                }
                // Не отображаются при просмотре из file://
                if ($selectedElemFunction == 'addSocialLike') {
                    var likeWidget = new SocialLikeWidgetView().render().el;
                    $selectedElement.replaceWith(likeWidget);
                }
                // Не отображаются при просмотре из file://
                if ($selectedElemFunction == 'addSocialShare') {
                    var shareWidget = new SocialShareWidgetView().render().el;
                    $selectedElement.replaceWith(shareWidget);
                }
                if ($selectedElemFunction == 'addFooter') {
                    var footerWidget = new FooterWidgetView().render().el;
                    $selectedElement.replaceWith(footerWidget);
                }
                if ($selectedElemFunction == 'addButton') {
                    var btnWidget = new ButtonWidgetView().render().el;
                    $selectedElement.replaceWith(btnWidget);
                }
                if ($selectedElemFunction == 'addCounter') {
                    var counterWidget = new CounterWidgetView().render().el;
                    $selectedElement.replaceWith(counterWidget);
                }
                if ($selectedElemFunction == 'addMap') {
                    var mapWidget = new MapWidgetView().render().el;
                    $selectedElement.replaceWith(mapWidget);
                }
                if ($selectedElemFunction == 'addVideo') {
                    var videoWidget = new VideoWidgetView().render().el;
                    $selectedElement.replaceWith(videoWidget);
                }
                if ($selectedElemFunction == 'addContacts') {
                    var contactsWidget = new ContactsWidgetView().render().el;
                    $selectedElement.replaceWith(contactsWidget);
                }
            });
        }
    });
    return ConstructorView;
});