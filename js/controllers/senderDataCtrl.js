app.controller('senderDataCtrl', ['$scope', 'SenderData', function($scope, SenderData){
	$scope.senders = SenderData.getData();
	$scope.isChangeEvailable = false;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}
	$scope.addSender = function(){
		SenderData.addData({
			city: '3M',
			addressFrom: 'asd',
			phone: '800',
			contactName: 'name',
			shopName: 'shop'
		});
	}
}]);