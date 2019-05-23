import './playerPlays.html'
import { Games } from "../../../api/game/games";

Template.playerPlays.helpers({
    amountPlays: function() {
        return Games.find({'players.name': this.name}).count();
    }
});

Template.playerWinRate.helpers({
    winRate: function() {
        if (this.amountWins === 0) {
            return '0 %'
        }
        const winrate = this.amountWins / Games.find({'players.name': this.name}).count();
        return `${Math.round(winrate*100)} %`;
    }
});