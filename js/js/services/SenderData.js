app.service('SenderData', ['$http', function($http){

	var senders = [{
		city: '1M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop'
	},{
		city: '2M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop'
	}];

	function getData(){
		return senders
	}
	function addData(newSender){
		senders.push(newSender);
	}
	return {
		getData: getData,
		addData: addData
	};
}]);