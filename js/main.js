
var tabApp = angular.module("tabApp",  ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.
	when("/", {
        templateUrl: "/views/home.html",
		controller: 'HomeController'
    }).
    when ("/search", {
        templateUrl: "/views/result.html",
		controller: 'ResultController'
    }).
    when("/profile", {
        templateUrl: "/views/profile.html",
		controller: 'ProfileController'
    });
});
tabApp.service('Result', function($rootScope) {
	var result = null;

	return {
		getResult: function () {
			return result;
		},
		setResult: function (value) {
			result = value;
		}
	};
});

