app.controller('ordersHistoryCtrl', [
    '$scope',
    '$modal',
    'historyData',
    'OrdersHistoryData',
    '$filter',
    'FileSaver',
    'OrderStatusService',
    'RestOrdersService',
    function ($scope, $modal, historyData, OrdersHistoryData, $filter, FileSaver, OrderStatusService,RestOrdersService) {
        //todo переделать под сервис
        var deliveryTypes = {
            1: 'Доставка',
            2: 'Курьер',
            3: 'Вывоз',
            4:'Самовывоз'
        };
        $scope.deliveryTypes = [];
        angular.forEach(deliveryTypes, function (value, key) {
            $scope.deliveryTypes.push({
                'code': key,
                'name': value
            });
        });
        // todo end
        $scope.statusList = OrderStatusService.getList();
        $scope.items=[];
        $scope.pagingBy=5;
        var currentTableState = {};
        $scope.getOrders = function (tableState) {
            currentTableState = tableState;
            var pagination = tableState.pagination || {};
            var pagerLimit = pagination.number || $scope.pagingBy;
            var predicated = tableState.search.predicateObject || {};
            var filter = {
                skip: pagination.start || 0,
                limit: pagerLimit
            };
            filter = _.assign(filter, predicated);
            RestOrdersService.getList(filter).then(function (responseList) {
                // респонз сохраняем в собственный ордерс, и рисуется таблица
                $scope.items = responseList;
                // incoming это похоже наличие какого то документа, дальше проходится по списку и ищется есть ли там документы какие то - Номер поступления
                var incomingStorage = {};
                var deliveryType, statusCode, barcode, number;
                responseList.forEach(function (order, idx) {
                    statusCode = (order.status && order.status.code) ? order.status.code : 0;
                    barcode = (order.items && order.items[0] && order.items[0].barcode) ? order.items[0].barcode : '';
                    number = (order.number) ? order.number : '';
                    order.humanReadable = {
                        'deliveryType': deliveryTypes[order.delivery_type]||' ',
                        'status': OrderStatusService.getLabel(statusCode),
                        'barcode': barcode,
                        'number': number
                    };
                    order.incoming && (
                        incomingStorage[order.incoming] || (
                            incomingStorage[order.incoming] = []
                        )
                            , incomingStorage[order.incoming].push(idx)
                    )
                });
                tableState.pagination.numberOfPages = Math.ceil(responseList.count / pagerLimit)
            })
        };
        $scope.$watch('search.status.code', function (newVal, a, $scope) {
            if (newVal === null && $scope.search && $scope.search.status) {
                $scope.search.status.code = '';
            }
        });
        $scope.getPrintPdf = function (item) {
            return OrdersHistoryData.downloadART(item._id).then(function (t) {
                var o = new Blob([t.data], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
                //todo fix filename generation
                FileSaver.saveAs(o, "Акт " + ".docx")
            });
        };
        $scope.getCheckedItems = function () {
            var result = [];
            $scope.items.forEach(function (item) {
                if (item.checked) {
                    result.push(item);
                }
            });
            return result;
        };
        function checkAll() {
            $scope.items.forEach(function (item) {
                item.checked = true;
            });
        }

        function uncheckAll() {
            $scope.items.forEach(function (item) {
                item.checked = false;
            });
        }

        $scope.toggleMasterCheckbox = function (checked) {
            checked = !checked;
            if (checked) {
                uncheckAll();
            } else {
                checkAll();
            }
        }
        $scope.checkboxChanged = function (checked) {
            if (checked) {
                if ($scope.getCheckedItems().length === $scope.items.length) {
                    $scope.isMasterChecked = true;
                }
            } else {
                $scope.isMasterChecked = false;
            }
        }
        $scope.printActs = function () {
            // TODO
            alert('PRINT! ');
        }
        function modalOrderInfoCtrl($scope) {
            $scope.isOrderDataShown = false;
            $scope.titleText = 'Информация';
            $scope.changeDataView = function () {
                $scope.titleText = $scope.isOrderDataShown ? 'История изменения' : 'Информация'
                console.log('!!', $scope.isOrderDataShown);
            }
        }

        modalOrderInfoCtrl.$inject = ['$scope'];
        var myModal = $modal({
            controller: modalOrderInfoCtrl,
            templateUrl: 'modals/modalOrderInfo.html',
            show: false
        });
        var shownItem=null;
        $scope.isShownInfo=function (item) {
          return item==shownItem;
        };
        $scope.hideInfo=function () {
            shownItem=null;
        };
        $scope.showInfo = function (item) {
            // console.log(this,item);
            shownItem=item;
            // myModal.$promise.then(myModal.show);
        };
    }
]);