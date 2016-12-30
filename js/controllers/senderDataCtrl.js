app.controller('senderDataCtrl', ['$scope', 'SenderData', '$rootScope', function($scope, SenderData, $rootScope){
	$rootScope.pageTitle = 'Данные отправителя';
	function selfUpdate(response) {
        $scope.senders = SenderData.parse(response);
    }
	SenderData.getData().then(selfUpdate);
	$scope.isChangeEvailable = false;
	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	};
	$scope.rmSender = function (id,$event) {
        $event.stopPropagation();
        $event.preventDefault();
		SenderData.rmSender(id).then(selfUpdate);
		return false;
    };
	$scope.saveAll=function () {
		SenderData.saveAll($scope.senders).then(selfUpdate);
    };
	$scope.addSender = function(){
		SenderData.addData({
			city: '',
			addressFrom: '',
			phone: '',
			contactName: '',
			shopName: ''
		}).then(selfUpdate);
	}
}]);