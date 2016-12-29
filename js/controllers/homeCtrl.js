app.controller('homeCtrl', ['$scope', 'contactData', 'PersonalData', function($scope, contactData, PersonalData){
	$scope.isChangeEvailable = false;

	$scope.organizationName = PersonalData.getSavedData().user.work_at;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}

	$scope.save = function(){
		$scope.isChangeEvailable = false;
	}
}]);