app.controller('homeCtrl', ['$scope', '$http', 'PersonalData', function($scope, $http, PersonalData){
	$scope.isChangeEvailable = false;
	$scope.organizationName = PersonalData.organizationName;
	$scope.contactPerson = PersonalData.contactPerson;
	$scope.contactPhone = PersonalData.contactPhone;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}

	$scope.save = function(){
		$scope.isChangeEvailable = false;
	}
}]);