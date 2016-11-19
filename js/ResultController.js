angular.module('tabApp')
    .controller('ResultController', function ($scope, $location, $http, Result, $rootScope) {
	//init get the url param
	var param = $location.search().param;
	//call search query
	getSearchResult(param);
	$rootScope.query = param;
	$scope.professors = new Array();
	//search query through database
	function getSearchResult(query){
		Result.setResult(query);
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
			  var tempProfessor = new Object();
			  tempProfessor.id = professor._id;
			  tempProfessor.name = professor.Name;
			  tempProfessor.subField = professor.Subfield;
			  tempProfessor.university = professor.University;
			  $scope.professors[i] = tempProfessor;
			}
		}
	}
	//search query
	$scope.searchQuery = function(){	
		query = $rootScope.query;	
		$location.search({param: query});;
		getSearchResult(query);
		};

});