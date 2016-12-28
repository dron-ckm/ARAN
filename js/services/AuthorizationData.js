app.service('AuthorizationData', ['$cookies', function($cookies){
	var data = {
		user: '',
		password: '',
		token: '',
		removeToken:function () {
			$cookies.remove('_token');
        },
		getToken: function() {
			var token = $cookies.get('_token') || null;
			this.token = token;
			return token
		},
		setData: function(newData){
			for ( var key in newData) {
				this[key] = newData [key];
			}
			$cookies.put('_token', newData.token);
			this.token = newData.token;
		}
	}

	return data;
}]);