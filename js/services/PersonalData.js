app.service('PersonalData', ['AuthorizationData', '$http', '$q', function(AuthorizationData, $http, $q){
	var personalDataObj = {},
		req = {
			method: 'GET',
			url: 'https://cdocs-wh.arancom.ru/users/me',
			headers: {'authentication-token': AuthorizationData.getToken()}
    	};

	function getRequestData() {
	    var deferred = $q.defer();

        $http(req).then(function successCallback(response) {
	    	personalDataObj = response.data;
	    	deferred.resolve(response.data);
	    }, function errorCallback(response) {
	    	deferred.reject(response)
	    });
        return deferred.promise;
	}

	function getSavedData(){
		if (Object.keys(personalDataObj).length === 0) {
			return $q.when(getRequestData())
		}
		return $q.when(personalDataObj)
	}

	return {
		getSavedData: getSavedData
	}
}]);