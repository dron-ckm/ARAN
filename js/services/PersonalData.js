app.service('PersonalData', ['AuthorizationData', '$http', function(AuthorizationData, $http){
	var personalDataObj = {},
		req = {
			method: 'GET',
			url: 'https://cdocs-wh.arancom.ru/users/me',
			headers: {'authentication-token': AuthorizationData.getToken()}
    	};

	function getRequestData() {
	    return $http(req).then(function successCallback(response) {
	    	personalDataObj = response.data;
			return response;
	    }, function errorCallback(response) {
			return response;
	    });
	}
	//TODO: DRY !!! leave only one func
	function getSavedData(){
		if (Object.keys(personalDataObj).length === 0) {
			return getRequestData()
		}
		return personalDataObj
	}

	return {
		getRequestData: getRequestData,
		getSavedData: getSavedData
	}
}]);