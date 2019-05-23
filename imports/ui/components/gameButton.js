import './gameButton.html'

import {Session} from "meteor/session";


Template.gameButton.events({
    'click #contactUpdateButton': function(event, template) {
        Session.set('currentGameId', this._id);
    }
});

Template.gameRemove.events({
    'click #remove-game': function(event, template) {
        Meteor.call('removeGame', this._id, function(err, result) {})
    }
});