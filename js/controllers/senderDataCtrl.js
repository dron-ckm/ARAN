app.controller('senderDataCtrl', ['$scope', 'SenderData', function($scope, SenderData){
    $scope.unSaved=false;
	function selfUpdate(response) {
        $scope.senders = SenderData.parse(response);
    }
	SenderData.getData().then(selfUpdate);
	$scope.isChangeEvailable = false;
	$scope.toggleEdit = function(){
		$scope.isChangeEvailable = !$scope.isChangeEvailable;
	};
	$scope.rmSender = function (id,$event) {
        $event.stopPropagation();
        $event.preventDefault();
        if (id) {
            $scope.senders.splice(id,1);
        }
		return false;
    };
	$scope.saveAll=function () {
		SenderData.saveAll($scope.senders).then(selfUpdate);
		$scope.unSaved=false;
    };
    $scope.$watch("senders", function(newVal,oldVal){
    	// при инициализации не сработает лишний раз
		$scope.unSaved = (newVal&&oldVal&&newVal!==oldVal);
    }, true);
	$scope.addSender = function(){
        $scope.senders.push({
			id:$scope.senders.length,
			new:true
		});
	}
}]);