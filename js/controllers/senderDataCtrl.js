app.controller('senderDataCtrl', ['$scope', 'SenderData', '$rootScope', function($scope, SenderData, $rootScope){
	$rootScope.pageTitle = 'Данные отправителя';
  $scope.unSaved=false;

	function selfUpdate(response) {
        $scope.senders = SenderData.parse(response);
        $scope.unSaved=false;
    }
	SenderData.getData().then(selfUpdate);
	$scope.isChangeEvailable = false;
	$scope.toggleEdit = function($event){
        $event.preventDefault();
        $scope.isChangeEvailable = !$scope.isChangeEvailable;
	};
	$scope.rmSender = function (sender,$event) {
        $event.stopPropagation();
        $event.preventDefault();
		_.remove($scope.senders, sender);
		return false;
    };
	$scope.saveAll=function ($event) {
        $event.preventDefault();
        SenderData.saveAll($scope.senders).then(selfUpdate);
    };
    $scope.$watch("senders", function(newVal,oldVal){
    	// при инициализации не сработает лишний раз
		$scope.unSaved = (newVal&&oldVal&&newVal!==oldVal);
    }, true);
    $scope.addSender = function ($event) {
        $event.preventDefault();
        $scope.senders.push({
            id: $scope.senders.length,
            new: true
        });
    }
}]);