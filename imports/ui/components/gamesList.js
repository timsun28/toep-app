import { Games } from "../../api/game/games.js";
import { Players } from "../../api/player/players.js";
import {Session} from "meteor/session";


import './gamesList.html'
import './newGame.js'
import './player/newPlayer.js'
import './player/playerStars.js'
import './gameButton.js'
import './gameOverview.js'
import '../partials/playerUpdateButton.js'

const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];


Template.gamesList.onCreated(function(){
    this.subscribe('games');
    this.subscribe('players');
    Session.set('newPlayerValue', false);
});


Template.gamesList.helpers({
    games: () => {
        return Games.find();
    },
    players: () => {
        return Players.find();
    },
    playerFields: () => {
        return [
            {key: 'createdAt', label: 'Datum', fn: function(value) {return `${value.getHours()}:${('0' + value.getMinutes()).slice(-2)} ${days[value.getDay() - 1]} ${[value.getDate(), value.getMonth() + 1, value.getFullYear()].join('-')}`}},
            {key: 'name', label: 'Naam'},
            {key: 'amountWins', label: 'Aantal keer gewonnen', tmpl: Template.playerStars, cellClass: 'col-md-2'},
            {key: 'contactInfo', label: 'Bewerken', tmpl: Template.playerUpdateButton, cellClass: 'col-md-4'},
        ]
    },
    gameFields: () => {
        return [
            {key: 'createdAt', label: 'Datum', fn: function(value) {return `${value.getHours()}:${('0' + value.getMinutes()).slice(-2)} ${days[value.getDay() - 1]} ${[value.getDate(), value.getMonth() + 1, value.getFullYear()].join('-')}`}},
            {key: 'maxPoints', label: 'Max Punten'},
            {key: 'contactInfo', label: 'Bewerken', tmpl: Template.gameButton, cellClass: 'col-md-4'},
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