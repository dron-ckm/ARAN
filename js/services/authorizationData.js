app.service('AuthorizationData', ['$cookies', function($cookies){
	var data = {
		user: '',
		password: '',
		token: '',
		getToken: function() {
			var token = $cookies.get('_token') || null;
			this.token = token;
			return token
		},
		setData: function(newData){
			for ( var key in newData) {
				this[key] = newData [key];
			}
			console.log('new', newData);
			$cookies.put('_token', newData.token);
			this.token = newData.token;
		}
	}

	return data;
}]);