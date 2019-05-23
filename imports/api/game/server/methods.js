import {Games} from "../games";

Meteor.methods({
    'updateScoreGame': function(id, playerName, points) {
        Games.update({_id : id , "players.name":playerName} , {$inc: {"players.$.points": points}})
    }
});