import './updatePlayer.html'

import { Players } from '../../../api/player/players.js'
import {Session} from "meteor/session";


Template.updateContact.events({
    'click .fa-close': function() {
        Session.set('newPlayervalue', false);
    },
    'click .update': function() {
        Session.set('newPlayervalue', false);
        bootbox.hideAll()
    }
});

Template.updateContact.helpers({
    playerCollection: function() {
        return Players
    },
    amountWins: function() {
        return Template.currentData().data.amountWins;

    },
    player : function() {
        console.log(Template.currentData().data);
        return Template.currentData().data;
    },
    options: function() {
        return [

        ]
    },
});
