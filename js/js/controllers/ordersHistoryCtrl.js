app.controller('ordersHistoryCtrl', ['$scope', '$modal', 'historyData', function($scope, $modal, historyData){

	console.log('!!!', historyData);
	$scope.items = [
		{
			num: 1,
			shopNum: 1,
			code: 777,
			where: 'Moscow',
			price: '800p',
			status: 'done',
			showInView:false
		},
		{
			num: 2,
			shopNum: 2,
			code: 777,
			price: '800p',
			where: 'Moscow',
			status: 'in progress',
			showInView:false
		},
		{
			num: 3,
			shopNum: 3,
			code: 777,
			price: '800p',
			where: 'Moscow',
			status: 'done',
			showInView:false
		},
		{
			num: 4,
			shopNum: 4,
			code: 777,
			where: 'Moscow',
			price: '800p',
			status: 'done',
			showInView:false
		}
	];

	$scope.getCheckedItems = function (){
		var result = [];
		$scope.items.forEach(function(item){
			if (item.checked) {
				result.push(item);
			}
		});
		return result;
	}

	function checkAll(){
		$scope.items.forEach(function(item){
			item.checked = true;
		});
	}

	function uncheckAll(){
		$scope.items.forEach(function(item){
			item.checked = false;
		});
	}

	$scope.toggleMasterCheckbox = function(checked){
		checked = !checked;

		if (checked) {
			uncheckAll();
		} else {
			checkAll();
		}
	}
	$scope.checkboxChanged = function(checked){
		if (checked) {
			if ($scope.getCheckedItems().length === $scope.items.length) {
				$scope.isMasterChecked = true;
			}
		} else {
			$scope.isMasterChecked = false;
		}
	}
	$scope.printActs = function(){
		// TODO
		alert('PRINT! ');
	}
	$scope.showInfo = function(item) {
		item.showInView = !item.showInView;
	}
	// function modalOrderInfoCtrl($scope) {
	//     $scope.isOrderDataShown = false;
	//     $scope.titleText = 'Информация';
	//     $scope.changeDataView = function(){
	//     	$scope.titleText = $scope.isOrderDataShown ? 'История изменения' : 'Информация'
	//
	//     	console.log('!!', $scope.isOrderDataShown);
	//     }
	// }
	// modalOrderInfoCtrl.$inject = ['$scope'];
    //
	// var myModal = $modal({controller: modalOrderInfoCtrl, templateUrl: 'modals/modalOrderInfo.html', show: false});
    //
	// $scope.showInfo = function (item) {
	// 	console.log(item);
	// 	myModal.$promise.then(myModal.show);
	// };
}]);