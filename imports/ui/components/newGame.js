import './newGame.html'

import { Games } from '../../api/game/games.js'
import { Players } from '../../api/player/players.js'

import {Session} from "meteor/session";

Template.newGame.onCreated(function(){
    this.subscribe('games');
    this.subscribe('players');
});

Template.newGame.events({
    'click .fa-close': function() {
        Session.set('newGameValue', false);
    },
    'click .insert': function() {
        Session.set('newGameValue', false);
    }
});

Template.newGame.helpers({
    gameCollection: function() {
        return Games
    },
    playerFields: function() {
        return Players.find().map(function (player) {
            return {
                label: player.name,
                value: player.name
            }
        })
    },
});
