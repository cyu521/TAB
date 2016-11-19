angular.module('tabApp')
    .controller('ResultController', function ($scope, $location, $http, Result) {
	//init get the url param
	var param = $location.search().param;
	//call search query
	getSearchResult(param);

	//search query through database
	function getSearchResult(query){
		$scope.query = query;
		if(query != undefined){
			$http({
				method: 'POST',
				url: '/getResult',
				data: {query}
			}).then(function successCallback(response) {
				//success, set the results
				readResult(response);
			}, function errorCallback(response) {

			});
				
			}
	}
	//read the results
	function readResult(response) {
		var professors = response.data;
		if(professors != null){
			for (var i=0; i<professors.length; i++) {
			  var professor = professors[i];
			  $scope.name = professor.Name;
			  $scope.subField = professor.Subfield;
			  $scope.university = professor.University;
			}
		}
	}
	//search query
	$scope.searchQuery = function(){	
		query = $scope.query;	
		$location.search({param: query});;
		getSearchResult(query);
		};

});