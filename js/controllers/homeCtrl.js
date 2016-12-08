app.controller('homeCtrl', ['$scope', '$http', 'personalData', function($scope, $http, personalData){
	$scope.isChangeEvailable = false;
	$scope.organizationName = personalData.organizationName;
	$scope.contactPerson = personalData.contactPerson;
	$scope.contactPhone = personalData.contactPhone;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}

	$scope.save = function(){
		$scope.isChangeEvailable = false;
	}
}]);