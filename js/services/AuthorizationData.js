app.service('AuthorizationData', ['$cookies', '$rootScope', function($cookies, $rootScope){
	var data = {
		login: null,
		token: null,
		removeToken:function () {
			$cookies.remove('_token');
        },
        removeLogin:function () {
			$cookies.remove('_login');
        },
		getToken: function() {
			var token = this.token || $cookies.get('_token') || null;
			this.token = token;
			return token
		},
		getLogin: function(){
			var login = this.login || $cookies.get('_login') || null;
			this.login = login;
			return login
		},
		saveToken: function(token){
			$cookies.put('_token', token);
			this.token = token;
		},
		saveLogin: function(login) {
			$cookies.put('_login', login);
		},
		clearData: function(){
			this.token = null;
			this.login = null;
			this.removeToken();
			this.removeLogin();
		}
	}

	return data;
}]);