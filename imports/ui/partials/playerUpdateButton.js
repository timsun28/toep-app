import './playerUpdateButton.html'

import '../components/player/updatePlayer.js'

Template.playerUpdateButton.events({
    'click #editPlayer': function (event, template) {
        bootbox.dialog({
            title: 'Bewerk Speler',
            message: 'test',
            onEscape: true
        }).init(() => {
            const bodySelector = $('.bootbox-body');
            bodySelector.html('');
            Blaze.renderWithData(Template.updateContact, {data: this}, bodySelector.get(0));
        });
    }
});