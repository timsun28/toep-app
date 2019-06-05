import {Tracker} from "meteor/tracker";

export const Games = new Mongo.Collection('games');

import SimpleSchema from 'simpl-schema'
import {Players} from "../player/players.js";
SimpleSchema.extendOptions(['autoform']);

Games.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    }
});

const gamesSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        label: 'Aanmaak datum',
        autoValue: function() {
            return new Date()
        }
    },
    finished: {
        type: Boolean,
        label: 'Afgerond',
        autoform: {
            value: false,
        }
    },
    maxPoints: {
        type: Number,
        label: 'Max Punten',
        autoform: {
            value: 15,
        }
    },
    players: {
        type: Array,
        minCount: 0,
        label: 'Spelers',

    },
    'players.$': {
        type: Object,
        label: 'Speler'
    },
    'players.$.name': {
        type: String,
        label: 'name',
        autoform: {
            type: 'select',
            options: function(){
                return Players.find().map(function (player) {
                    return {
                        label: player.name,
                        value: player.name
                    }
                })
            }
        }
    },
    'players.$.points': {
        type: Number,
        label: 'Punten',
        autoform: {
            type: "hidden",
            value: 0,
        }
    },
    'players.$.pussyPoints': {
        type: Number,
        label: 'Punten',
        autoform: {
            type: "hidden",
            value: 0,
        }
    },
    'players.$.status': {
        type: String,
        label: 'Status',
        autoform: {
            type: "hidden",
            value: 'Spelend',
        }
    }
});

gamesSchema.debug = true;
Games.attachSchema(gamesSchema, {tracker: Tracker});