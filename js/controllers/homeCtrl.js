app.controller('homeCtrl', ['$scope', 'contactData', 'PersonalData', function($scope, contactData, PersonalData){
	$scope.isChangeEvailable = false;
	/*
	$scope.organizationName = PersonalData.organizationName;
	$scope.contactPerson = PersonalData.contactPerson;
	$scope.contactPhone = PersonalData.contactPhone;*/

	console.log(contactData.data, PersonalData.getSavedData());

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}

	$scope.save = function(){
		$scope.isChangeEvailable = false;
	}
}]);