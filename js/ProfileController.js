angular.module('tabApp')
    .controller('ProfileController', function ($scope, $location, $http, Result, $rootScope) {
	//init get the url param
	var param = $location.search().param;
		
	//get profile info
	getProfileInfo(param);
	
	//search id through database
	function getProfileInfo(id){
		if(id != undefined){
			$http({
				method: 'POST',
				url: '/getProfessorById',
				data: {id}
			}).then(function successCallback(response) {
				//success, set the results
				readResult(response);
			}, function errorCallback(response) {

			});
				
		}
	}
	$scope.professor = new Object();
	
	//read the results
	function readResult(response) {
		var professor = response.data;
		console.log(response)
		if(professor != null){
		  var tempProfessor = new Object();
		  console.log(professor)
		  tempProfessor.id = professor._id;
		  tempProfessor.name = professor.Name;
		  tempProfessor.subField = professor.Subfield;
		  tempProfessor.university = professor.University;
		  tempProfessor.bachelors = professor.Bachelors;
		  tempProfessor.masters = professor.Masters;
		  tempProfessor.doctor = professor.Doctorate;
		  tempProfessor.joinYear = professor.JoinYear;
		  tempProfessor.sources = new Array();
		  if(professor.Sources1 != ""){
			  tempProfessor.sources[0] = professor.Sources1;
			  if(professor.Sources2 != ""){
			  tempProfessor.sources[1] = professor.Sources2;
				  if(professor.Sources3 != ""){
				  tempProfessor.sources[2] = professor.Sources3;
				  if(professor.Sources4 != ""){
					  tempProfessor.sources[3] = professor.Sources4;
				}
			  }
			}
		  }
		  $scope.professor = tempProfessor;
		}
	}
	
	//search function
	$scope.searchQuery = function(){	
	query = $rootScope.query;	
	if(query != undefined){
		//navigate to result page with query as param
		$location.path('/search').search({param: query});;
		}
	};
	
	});