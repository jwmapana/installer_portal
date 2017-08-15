apanaApp.config(function ($routeProvider, $locationProvider) {

	// use the HTML5 History API to make urls pretty
	// $locationProvider.html5Mode(true); //this removes the hashtag in the url but page refreshes no longer work
	$locationProvider.hashPrefix('');

	// Root
	$routeProvider
	.when('/', {
		template: '',
		controller: 'homeController'
	})
	.when('/logout', {
	  controller: 'logoutController',
	  templateUrl: '/views/login.html',
	})

	/// Login
	.when('/login',{
	  controller: 'loginController',
	  templateUrl: '/views/login.html'
	})
	.when('password_reset',{
		controller: 'passwordResetController',
		templateUrl: '/views/password_reset.html'
	})

	.when('/access_token=:accessToken', {
           template: '',
           controller: 'accessToken'
         })

	/// Page Routes
	.when('/connections', {
		controller: 'connectionsController',
		templateUrl: '/views/connections.html'
	})
	// Catch-all
	.otherwise({
	  redirectTo: '/',
	});
});
