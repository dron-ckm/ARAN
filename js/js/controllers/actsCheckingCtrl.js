app.controller('actsCheckingCtrl', [ '$scope', function($scope){
	$scope.items = [{
		num: 1,
		interval: 'some data'
	},
	{
		num: 2,
		interval: 'some data'
	},
	{
		num: 3,
		interval: 'some data'
	},
	{
		num: 4,
		interval: 'some data'
	},
	{
		num: 5,
		interval: 'some data'
	}];

	$scope.download = function(item){
		alert('тут будет функционал загрудки PDF/EXCEL ->' + angular.toJson(item));
	}


}]);