app.factory('OrdersHistoryData', ['$http', 'AuthorizationData', function($http, AuthorizationData){
	var req = {
      method: 'GET',
      url: 'https://cdocs-wh.arancom.ru/orders',
      headers: {'authentication-token': AuthorizationData.getToken()}
    };
    function downloadART(item) {
			return $http({
                cache: !1,
                responseType: "blob",
				method:req.method,
				url:req.url+'/'+item+'/'+'print-act-receiving-transfer',
				headers:{
                    'authentication-token': AuthorizationData.getToken()
				}
			}).then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                return response;
            });
    };
	function getData() {
	    return $http(req).then(function successCallback(response) {
			return response;
	    }, function errorCallback(response) {
			return response;
	    });
	}
	return {
		getData: getData,
		downloadART:downloadART
	};
}]);