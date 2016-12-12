app.factory('OrdersHistoryData', ['$http', 'AuthorizationData', function($http, AuthorizationData){
	var req = {
      method: 'GET',
      url: 'https://cdocs-wh.arancom.ru/orders',
      headers: {'authentication-token': AuthorizationData.getToken()}
    };
    
	function getData() {
	    return $http(req).then(function successCallback(response) {
			return response;
	    }, function errorCallback(response) {
			return response;
	    });
	}
	return {
		getData: getData
	};
}]);