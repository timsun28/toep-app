import {Games} from "../games";
import {Players} from "../../player/players";

Meteor.methods({
    'updateScoreGame': function(id, playerName, points) {
        Games.update({_id : id , "players.name":playerName} , {$inc: {"players.$.points": points}})
    },
    'updatePussyPoints': function(id, playerName, points) {
        Games.update({_id : id , "players.name":playerName} , {$inc: {"players.$.pussyPoints": points}});
        Players.update({name: playerName}, {$inc: {'amountPussyPoints': points}})
    },
    'removeGame': function(id) {
        Games.remove(id);
    },
    'returnAmountWinsPlayer': function(playerName) {
        return Games.find({'finished': true, 'players': {'$elemMatch': {'name': playerName, 'status': {'$ne': 'Verloren'}}}}).count();
    }
});

