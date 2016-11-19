angular.module('tabApp').controller('HomeController', function ($scope, $location, Result, $rootScope) {
$rootScope.Title = "The Advisor Board"
$scope.searchQuery = function(){	
	query = $rootScope.query;	
	if(query != undefined){
		//navigate to result page with query as param
		$location.path('/search').search({param: query});;
		}
	};
});