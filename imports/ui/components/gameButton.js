import './gameButton.html'

import {Session} from "meteor/session";


Template.gameButton.events({
    'click #contactUpdateButton': function(event, template) {
        Session.set('currentGameId', this._id);
    }
});