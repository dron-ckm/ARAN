app.controller('senderData', ['$scope', function($scope){
	var senders = [{
		city: 'M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop'
	},{
		city: 'M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop'
	}];
	$scope.senders = senders;
	$scope.isChangeEvailable = false;

	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	}
	$scope.addSender = function(){
		senders.push({
		city: 'M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop'
	})
	}
}]);