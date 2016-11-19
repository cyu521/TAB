angular.module('tabApp').controller('HomeController', function ($scope, $location, $http, Result) {
	
$scope.searchQuery = function(){	
	query = $scope.query;	
	if(query != undefined){
		//navigate to result page with query as param
		$location.path('/search').search({param: query});;
		}
	};
});