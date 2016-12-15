app.controller('loginCtrl', ['$scope', '$http', 'AuthorizationData', '$state', '$rootScope', function($scope, $http, AuthorizationData, $state, $rootScope){
	$scope.authorize = function($event){
		var req = {
			method: 'POST',
			url: 'https://cdocs-wh.arancom.ru/users/login',
			data: {
				user: $scope.login,
				password: 'Ielodebo'// $scope.pass//'Ielodebo'
			}
		};
		$event.preventDefault();
		$rootScope.stateIsLoading = true;
		$http(req).then(function successCallback(response) {
			AuthorizationData.setData(response.data);
			$rootScope.stateIsLoading = false;
			$state.go('home');
		}, function errorCallback(response) {
			$rootScope.stateIsLoading = false;
			alert('LOGIN ERROR', response);
		});
	}
}]);