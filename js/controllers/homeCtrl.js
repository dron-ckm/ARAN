app.controller('homeCtrl', ['$scope', 'contactData', '$rootScope', function($scope, contactData, $rootScope){
	$rootScope.pageTitle = 'Контактные данные';
	$scope.isChangeEvailable = false;

	$scope.organizationName = contactData.user.work_at;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}

	$scope.save = function(){
		$scope.isChangeEvailable = false;
	}
}]);