import './gameOverview.html'

import {Games} from "../../api/game/games";
import {Players} from "../../api/player/players";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";


Template.gameOverview.onCreated(function() {
    this.subscribe('games');
    this.subscribe('players');
});

Template.gameOverview.helpers({
    players: function() {
        const currentGameId = Session.get('currentGameId');
        const currentGame = Games.findOne(currentGameId);
        return currentGame.players;
    },
    loser: function() {
        return this.status === 'Verloren';
    },
    pelt: function() {
        return this.status === 'Pelt!';
    }
});

Template.gameOverview.events({
    'click #plusPoint' (event, template) {
        const currentGameId = Session.get('currentGameId');
        Meteor.call('updateScoreGame', currentGameId, this.name, 1, function(err, result) {
            checkGameFinished()
        });
    },
    'click #minusPoint' (event, template) {
        const currentGameId = Session.get('currentGameId');
        Meteor.call('updateScoreGame', currentGameId, this.name, -1, function(err, result) {
            checkGameFinished()
        });
    },
    'click #plusPussyPoint' (event, template) {
        const currentGameId = Session.get('currentGameId');
        Meteor.call('updatePussyPoints', currentGameId, this.name, 1, function(err, result) {
        });
    },
    'click #minusPussyPoint' (event, template) {
        const currentGameId = Session.get('currentGameId');
        Meteor.call('updatePussyPoints', currentGameId, this.name, -1, function(err, result) {
        });
    },
});

function checkGameFinished() {
    const currentGameId = Session.get('currentGameId');
    const currentGame = Games.findOne(currentGameId);
    if (currentGame.finished) {
        return;
    }
    const totalPlayersPlaying = [];
    currentGame.players.forEach(player => {
        if (player.points < currentGame.maxPoints) {
            totalPlayersPlaying.push(player.name);
        }
        if (player.points === currentGame.maxPoints - 1) {
            player.status = 'Pelt!'
        } else if (player.points >= currentGame.maxPoints) {
            player.status = 'Verloren'
        } else {
            player.status = 'Spelend'
        }
    });
    if (totalPlayersPlaying.length === 1) {
        const winner = totalPlayersPlaying[0];
        Meteor.call('updatePlayerWin', winner, function(err, result) {
            Games.update({_id: currentGameId}, {$set: {'finished': true}})
        });
    }
    Games.update({'_id': currentGameId}, {$set: {'players': currentGame.players}})
}
