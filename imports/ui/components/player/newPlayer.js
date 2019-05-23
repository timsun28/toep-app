import './newPlayer.html'

import { Players } from '../../../api/player/players.js'

import {Session} from "meteor/session";

Template.newPlayer.onCreated(function(){
    this.subscribe('players');
});

Template.newPlayer.events({
    'click .fa-close': function() {
        Session.set('newPlayerValue', false);
    },
    'click .insert': function() {
        Session.set('newPlayerValue', false);
    }
});

Template.newPlayer.helpers({
    playerCollection: function() {
        return Players
    },
});
