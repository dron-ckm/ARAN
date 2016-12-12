app.controller('newOrderCtrl', ['$scope', function($scope){
	var STEPS_COUNT = 4;

	$scope.deliveryType = 1;
	$scope.currentStep = 1;

	$scope.goNext = function(){
		if ($scope.currentStep <= STEPS_COUNT) {
			$scope.currentStep++;
		}
	}

	$scope.setDeliveryType = function(number){
		$scope.deliveryType = number;
	}

}]);