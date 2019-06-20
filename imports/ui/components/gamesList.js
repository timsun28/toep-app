import { Games } from "../../api/game/games.js";
import { Players } from "../../api/player/players.js";
import {Session} from "meteor/session";


import './gamesList.html'
import './newGame.js'
import './player/newPlayer.js'
import './player/playerStars.js'
import './player/playerPlays.js'
import './gameButton.js'
import './gameOverview.js'
import '../partials/playerUpdateButton.js'

Template.gamesList.onCreated(function(){
    this.subscribe('games');
    this.subscribe('players');
    Session.set('newPlayerValue', false);
});

Template.gamesList.helpers({
    games: () => {
        return Games.find({'finished': false});
    },
    gameFields: () => {
        return [
            {key: 'createdAt', label: 'Datum', sortOrder: 0, sortDirection: 'descending'},
            {key: 'maxPoints', label: 'Max Punten'},
            {key: 'contactInfo', label: 'Spelen', tmpl: Template.gameButton, cellClass: 'col-md-4'},
            {key: 'remove', label: 'Verwijderen (zonder bevestiging)', tmpl: Template.gameRemove, cellClass: 'col-md-4'},
        ]
    },
    players: () => {
        return Players.find();
    },
    playerFields: () => {
        return [
            {key: 'name', label: 'Naam'},
            {key: 'amountPlays', label: 'Aantal spellen afgerond', tmpl: Template.playerPlays, cellClass: 'col-md-1'},
            {key: 'amountWins', label: 'Aantal keer gewonnen', tmpl: Template.playerStars, cellClass: 'col-md-1'},
            {key: 'winRate', label: 'Win rate', tmpl: Template.playerWinRate, cellClass: 'col-md-1'},
            {key: 'contactInfo', label: 'Bewerken', tmpl: Template.playerUpdateButton, cellClass: 'col-md-1'},
        ]
    },
});

Template.gamesList.events({
    'click #new-game': () => {
        Session.set('newGameValue', true);
    },
    'click #new-player': () => {
        Session.set('newPlayerValue', true);
    },
});