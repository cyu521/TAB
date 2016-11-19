angular.module('tabApp')
    .controller('ResultController', function ($scope, $location, $http, $rootScope) {
	//init get the url param
	var param = $location.search().param;
	//call search query
	getSearchResult(param);
	$rootScope.query = param;
	$scope.professors = new Array();
	
	$rootScope.Title = "The Advisor Board"
	//search query through database
	function getSearchResult(query){
		$scope.delay = true;
		if(query != undefined){
			$http({
				method: 'POST',
				url: '/getResult',
				data: {query}
			}).then(function successCallback(response) {
				//success, set the results
				readResult(response);
				$scope.delay = false;
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
		$scope.changeQuery();
		$location.search({param: query});
		};
	
	//search query
	$scope.changeQuery = function(){
		query = $rootScope.query;	
		getSearchResult(query);		
		};

});