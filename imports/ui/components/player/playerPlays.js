import './playerPlays.html'
import { Games } from "../../../api/game/games";
import {Session} from "meteor/session";

Template.playerPlays.helpers({
    amountPlays: function() {
        return Games.find({'players.name': this.name, finished: true}).count();
    }
});

Template.playerWinRate.onCreated(() => {
    const playerName = Template.currentData().name;
    Meteor.call('returnAmountWinsPlayer', playerName, function(err, result) {
        if (result === 0) {
            Session.set(playerName + 'rate', '0 %');
        } else {
            const winrate = result / Games.find({'finished': true, 'players.name': playerName}).count();
            Session.set(playerName + 'rate', `${Math.round(winrate*100)} %`);
        }
    });
});

Template.playerWinRate.helpers({
    winRate: function() {
        const playerName = this.name;
        return Session.get(playerName + 'rate') || '0 %'
    }
});