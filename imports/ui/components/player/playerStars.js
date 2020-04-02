import './playerStars.html'
import {Games} from "../../../api/game/games";
import {Session} from "meteor/session";

Template.playerStars.onCreated(() => {
    const playerName = Template.currentData().name;
    Meteor.call('returnAmountWinsPlayer', playerName, function(err, result) {
        const stars = [];
        for (let i = 0; i < result; i+=1) {
            stars.push(i);
        }
        Session.set(playerName, stars);
    });
});

Template.playerStars.helpers({
    amountOfStars: function() {
        const playerName = this.name;
        return Session.get(playerName) || [];
    }
});