app.controller('ordersHistoryCtrl', [
    '$scope',
    '$modal',
    'historyData',
    'OrdersHistoryData',
    '$filter',
    'FileSaver',
    'OrderStatusService',
    'RestOrdersService',
    'SenderData',
    '$rootScope',
    function ($scope, $modal, historyData, OrdersHistoryData, $filter, FileSaver, OrderStatusService, RestOrdersService,SenderData, $rootScope) {
        $rootScope.pageTitle = 'История заказов';

        //todo переделать под сервис
        var deliveryTypes = {
            1: 'Доставка',
            2: 'Курьер',
            3: 'Вывоз',
            4: 'Самовывоз'
        };
        var payment_methods = {
            2: 'Предоплата',
            3: 'Оплата наличными',
            5: 'Оплата картой'
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
        $scope.items = [];
        $scope.pagingBy = 5;
        var currentTableState = {};
        $scope.getSticker = function (order) {
            order.withHttpConfig({
                cache: false,
                responseType: "blob"
            }).customGET("get-stickers").then(function (responseData) {
                var o = new Blob([responseData], {
                    type: "application/pdf"
                });
                FileSaver.saveAs(o, "Этикетки " + order.number + ".pdf")
            })
        };
        $scope.getStickers = function () {
            var orders = $scope.getCheckedItems()||false;
            if (orders) {
                var orderIds = _.map(orders,'_id');
                console.log(orderIds);
                RestOrdersService.one("get-stickers").withHttpConfig({
                    cache: false,
                    responseType: "blob"
                }).customGET("", {
                    orders: orderIds.join(",")
                }).then(function (responseData) {
                    console.log(responseData);
                    var e = new Blob([responseData], {
                        type: "application/pdf"
                    });
                    FileSaver.saveAs(e, "Этикетки " + orderIds.join(",") + ".pdf")
                })
            }
        };
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
                var statusCode, barcode;
                responseList.forEach(function (order, idx) {
                    statusCode = (order.status && order.status.code) ? order.status.code : 0;
                    barcode = (order.items && order.items[0] && order.items[0].barcode) ? order.items[0].barcode : '';
                    order.humanReadable = {
                        'deliveryType': deliveryTypes[order.delivery_type] || ' ',
                        'status': OrderStatusService.getLabel(statusCode),
                        'barcode': barcode,
                        'payment':payment_methods[order.payment_method]
                    };
                    order.isOrderDataShown = false;
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
        };
        $scope.checkboxChanged = function (checked) {
            if (checked) {
                if ($scope.getCheckedItems().length === $scope.items.length) {
                    $scope.isMasterChecked = true;
                }
            } else {
                $scope.isMasterChecked = false;
            }
        };
        $scope.printActs = function () {
            // TODO
            alert('PRINT! ');
        };
        // инфа о заказе
        $scope.shownItem = null;
        $scope.isShownItem = function (item) {
            return $scope.shownItem === item;
        };
        $scope.showInfo = function (item) {
            $scope.shownItem = ($scope.isShownItem(item)) ? null : item;
        };
    }
]);