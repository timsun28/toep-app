import {Players} from "../players.js";

Meteor.methods({
    'updatePlayerWin': function(playerName) {
        Players.update({name : playerName} , {$inc: {"amountWins": 1}})
    }
});