app.controller('newOrderCtrl', ['$scope', 'SenderData', '$filter', '$http', 'AuthorizationData', function($scope, SenderData, $filter, $http, AuthorizationData){
	var STEPS_COUNT = 4,
		maxStep = $scope.currentStep = 1;

	$scope.newOrder = {};
	$scope.newOrder.deliveryType = 1;
	$scope.newOrder.cargo = {};
	$scope.newOrder.cargo.placesCount = 1;
	$scope.newOrder.cargo.cargos = [
		// TODO: Move to function constructor
		{
			height: null,
			width: null,
			length: null,
			volume: null,
			// TODO move to function prototype
			getVolume: function(){
				this.volume = this.height * this.width * this.length || 0;
				return this.volume;
			}
		}
	];

	$scope.paymentType = [
		{
			name: 'Предоплата (заказ полностью предоплачен)',
			value : 1
		},
		{
			name: 'Оплата наличными при получении',
			value : 2
		},
		{
			name: 'Оплата картой при получении',
			value : 3
		}
	];

	$scope.newOrder.cargo.paymentType = $scope.paymentType[0];

	$scope.goStep = function(number){
		$scope.currentStep = number; return;

		maxStep = Math.max(maxStep, $scope.currentStep);
		if (maxStep >= number) {
			$scope.currentStep = number;
		}
	}

	$scope.goNext = function($event){
		$event.preventDefault();
		if ($scope.currentStep <= STEPS_COUNT) {
			$scope.currentStep++;
		}
	}

	$scope.setDeliveryType = function(number){
		$scope.deliveryType = number;
	}

	$scope.toggleDeliveryDate = function(){
		$scope.isDateDeliveryShown = !$scope.isDateDeliveryShown;
	}

	$scope.toggleDateAway = function(){
		$scope.isDateAwayShown = !$scope.isDateAwayShown;
	}

	$scope.addPlace = function($event) {
		$event.preventDefault();
		$scope.newOrder.cargo.placesCount++
	}

	$scope.removePlace = function($event) {
		$event.preventDefault();
		if ($scope.newOrder.cargo.placesCount >1) {
			$scope.newOrder.cargo.placesCount--
		}
	}
	$scope.addCargo = function($event) {
		$scope.newOrder.cargo.cargos.push({
			// TODO: use new C
			height: null,
			width: null,
			length: null,
			volume: null,
			// TODO move to function prototype
			getVolume: function(){
				this.volume = this.height * this.width * this.length || 0;
				return this.volume;
			}
		});
	}

	


	$scope.newOrder.shops = angular.copy(SenderData.getData());

	if ($scope.newOrder.shops.length === 1) {
		$scope.newOrder.selectedShop = $scope.newOrder.shops[0];
	}

	var req = {
      method: 'GET',
      url: 'https://cdocs-wh.arancom.ru/warehouses',
      headers: {'authentication-token': AuthorizationData.getToken()}
    };
    
	$http(req).then(function successCallback(response) {
		$scope.newOrder.aranStorages = response.data.warehouses;
    }, function errorCallback(response) {
		alert('ERROR ' + response)
    });


	// kladr-api js START
    var $city = $('.kladr_city'),
		$street = $('.kladr_street'),
		$building = $('.kladr_building');

	var $tooltip = $('.tooltip');

/*	$('.kladr_city').kladr({
		type: $.kladr.type.city
	});*/

	$.kladr.setDefault({
		parentInput: '.js-kladr-form-address',
		verify: true,
		select: function (obj) {
			setLabel($(this), obj.type);
			$tooltip.hide();
		},
		check: function (obj) {
			var $input = $(this);

			if (obj) {
				setLabel($input, obj.type);
				$tooltip.hide();
			}
			else {
				showError($input, 'Введено неверно');
			}
		},
		checkBefore: function () {
			var $input = $(this);

			if (!$.trim($input.val())) {
				$tooltip.hide();
				return false;
			}
		}
	});

	$city.kladr('type', $.kladr.type.city);
	$street.kladr('type', $.kladr.type.street);
	$building.kladr('type', $.kladr.type.building);

	// Отключаем проверку введённых данных для строений
	$building.kladr('verify', false);


	function setLabel($input, text) {
		text = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
		$input.parent().find('label').text(text);
	}

	function showError($input, message) {
		$tooltip.find('span').text(message);

		var inputOffset = $input.offset(),
			inputWidth = $input.outerWidth(),
			inputHeight = $input.outerHeight();

		var tooltipHeight = $tooltip.outerHeight();

		$tooltip.css({
			left: (inputOffset.left + inputWidth + 10) + 'px',
			top: (inputOffset.top + (inputHeight - tooltipHeight) / 2 - 1) + 'px'
		});

		$tooltip.show();
	}

	// kladr-api js END

}]);