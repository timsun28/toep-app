import { Games } from '../games.js'

Meteor.publish('games', function(){
    return Games.find({});
});
