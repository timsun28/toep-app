import {Tracker} from "meteor/tracker";

export const Players = new Mongo.Collection('players');

import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform']);

Players.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    }
});


const playersSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Naam'
    },
    createdAt: {
        type: Date,
        label: 'Aanmaak datum',
        autoValue: function() {
            return new Date()
        }
    },
    amountWins: {
        type: Number,
        label: 'Aantal keer gewonnen',
        autoform: {
            value: 0
        }
    },
    amountPussyPoints: {
        type: Number,
        label: 'Aantal Pussy Punten',
        autoform: {
            value: 0
        }
    },
});

playersSchema.debug = true;
Players.attachSchema(playersSchema, {tracker: Tracker});