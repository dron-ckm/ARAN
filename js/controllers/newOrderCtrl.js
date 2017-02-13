app.controller('newOrderCtrl', ['$scope', 'SenderData', '$filter', '$http', 'AuthorizationData', '$state', 'PersonalData', '$rootScope',
	function($scope, SenderData, $filter, $http, AuthorizationData, $state, PersonalData, $rootScope){

	$rootScope.pageTitle = 'Новый заказ';

	var STEPS_COUNT = 4,
		maxStep = $scope.currentStep = 1;

	var warehousesReq = {
      method: 'GET',
      url: 'https://cdocs-wh.arancom.ru/warehouses',
      headers: {'authentication-token': AuthorizationData.getToken()}
    };

	$http(warehousesReq).then(function successCallback(response) {
		console.log('warehouses', response);
		$scope.newOrder.aranStorages = response.data.warehouses;
    }, function errorCallback(response) {
    	if (response) {
			alert('warehouses ERROR ' + response.data.msg);
    	}
    });

	// TODO: $scope.newOrder = new Obj()
	$scope.newOrder = {};
	$scope.newOrder.recipient = {};

	$scope.newOrder.measurements = {};
	$scope.newOrder.measurements.timeEnd =  new Date();
	$scope.newOrder.measurements.timeStart =  new Date();
	$scope.step3name='Информация о товаре';
	$scope.$watch('newOrder.deliveryType',function (newVal) {
		if(newVal==1){
			$scope.step3name='Информация о товаре';
		}else{
            $scope.step3name='Данные получателя';
		}
    });
	$scope.$watch('newOrder.measurements.date', function(newVal){
		if (newVal){
			var month = newVal.getUTCMonth();
			var day = newVal.getUTCDate();
			var year = newVal.getUTCFullYear();
			$scope.newOrder.measurements.timeEnd.setDate(day);
			$scope.newOrder.measurements.timeEnd.setMonth(month);
			$scope.newOrder.measurements.timeEnd.setFullYear(year);
			$scope.newOrder.measurements.timeStart.setDate(day);
			$scope.newOrder.measurements.timeStart.setMonth(month);
			$scope.newOrder.measurements.timeStart.setFullYear(year);
		}
	});

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
			products: [],
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
			value : 2
		},
		{
			name: 'Оплата наличными при получении',
			value : 3
		},
		{
			name: 'Оплата картой при получении',
			value : 5
		}
	];

	$scope.newOrder.cargo.paymentType = $scope.paymentType[0];

	$scope.goStep = function(number){
		$scope.currentStep = number; return;
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
		$event.preventDefault();
		$scope.newOrder.cargo.cargos.push({
			// TODO: use new C
			height: null,
			width: null,
			length: null,
			volume: null,
			products: [],
			// TODO move to function prototype
			getVolume: function(){
				this.volume = this.height * this.width * this.length || 0;
				return this.volume;
			}
		});
	}

	$scope.removeCargo = function(cargoIndex, $event){
		$event.preventDefault();
		$scope.newOrder.cargo.cargos.splice(cargoIndex, 1);
	}

	$scope.addGoods = function($event, index) {
		$event.preventDefault();
		$scope.newOrder.cargo.cargos[index].products.push({
			// TODO: use new C
			name: null,
			article: null,
			cost: null,
			client_cost: null,
			quantity: null
		});
	}

	$scope.removeGoodsByNumber = function(cargoIndex, productIndex, $event) {
		$event.preventDefault();
		$scope.newOrder.cargo.cargos[cargoIndex].products.splice(productIndex, 1);
	}

	$scope.save = function(){
		var order = $scope.newOrder;

		var req = {
			method: 'POST',
			url: 'https://cdocs-wh.arancom.ru/orders',
			headers: {'authentication-token': AuthorizationData.getToken()},
			data: {
				client: {
					name: order.recipient.person,
					contact_person: order.recipient.person,
					contact_number: order.recipient.phone
				},
				comment: order.recipient.comments,
				consignor: null,
				date: order.recipient.date,
				delivery_type: order.deliveryType,
				drop_windows: null,
				groupedItems: getAllGoods(),
				items: getAllGoods(),
				dynamic_attributes: groupAllItems(),
				location: {
					apartment: order.recipient.flat,
					building: order.recipient.bilding,
					city: order.selectedShop.getterCity,
					house: order.recipient.bilding,
					street: order.recipient.street
				},
				number: order.cargo.number, // УНЗ:
				payment_method: order.cargo.paymentType.value,  	// newOrder.cargo.paymentType.value
				price: order.cargo.price,							// Стоимость заказа:        *************
				price_delivery: order.cargo.price,   				// Стоимость доставки (*):  *************
				statuses: [],
				warehouse: order.measurements.selectedStorage ? order.measurements.selectedStorage._id : null		// ??
			}
	    };

	    // Забор - вывоз

	    if (order.deliveryType == 1) {
	    	req.data.date = order.measurements.date;
	    	req.data.drop_windows = [{start: order.measurements.timeStart, end: order.measurements.timeEnd}];
	    }

	    $rootScope.stateIsLoading = true;

	    PersonalData.getSavedData().then(function(result) {
			req.data.consignor = result.user.work_at;
			$http(req).then(function successCallback(response) {
                console.log('RESPONSE SAVE NEW ORDER', response);
                $http({
                    method: 'POST',
                    url: 'https://cdocs-wh.arancom.ru/orders/create-incoming',
                    headers: {'authentication-token': AuthorizationData.getToken()},
                    data: {
                        created_at: new Date
                    }
                }).then(function successCallback(response) {
                	if (response){
                		console.log('INCOMING CREATED', response);
                    	$state.go('ordersHistory');
                	}
                }, function errorCallback(response) {
                	if (response){
                		// @hotfix
                		// TODO - проверить, нужно ли это вообще! походу документ поступления уже создается автоматом и дважды делать не надо
                		// alert('Ошибка! ' + response.data.msg);
						// $rootScope.stateIsLoading = false;
						$state.go('ordersHistory');
                	}
                });
		    }, function errorCallback(response) {
				alert('Ошибка! ' + response.data.msg);
				$rootScope.stateIsLoading = false;
		    });
		});
	}
    SenderData.getData().then(function (response) {
        $scope.newOrder.shops = SenderData.parse(response);
        $scope.newOrder.selectedShop = $scope.newOrder.shops[0];
    });

    function groupAllItems(){
    	return $scope.newOrder.cargo.cargos;
    }

	function getAllGoods(){
		var result = [],
			copy;

		$scope.newOrder.cargo.cargos.forEach(function(cargoPlace, i){
			result = result.concat(cargoPlace.products);
		});
		return result;
	}


	// kladr-api js START
    var $city = $('.kladr_city'),
		$street = $('.kladr_street'),
		$building = $('.kladr_building');

	var $tooltip = $('.tooltip');

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