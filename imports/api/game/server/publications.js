import { Games } from '../games.js'

Meteor.publish('games', function(){
    return Games.find({});
});

Meteor.publish('finishedGames', function() {
    return Games.find({'finished': false});
});
