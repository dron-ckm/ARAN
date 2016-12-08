app.controller('loginCtrl', ['$scope', '$http', 'AuthorizationData', function($scope, $http, AuthorizationData){
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
		$http(req).then(function successCallback(response) {
			AuthorizationData.setData(response.data);
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			console.log('!!!!!!!ERROR', response);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
}]);