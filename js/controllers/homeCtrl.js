app.controller('homeCtrl', ['$scope', 'contactData', function($scope, contactData){
	$scope.isChangeEvailable = false;

	$scope.organizationName = contactData.user.work_at;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}

	$scope.save = function(){
		$scope.isChangeEvailable = false;
	}
}]);