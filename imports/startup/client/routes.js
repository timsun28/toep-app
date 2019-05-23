import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/MainLayout.js'

FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'gamesList'});
	}
});

FlowRouter.route('/game', {
	name: 'game',
	action() {
		BlazeLayout.render('MainLayout', {main: 'gameOverview'})
	}
});