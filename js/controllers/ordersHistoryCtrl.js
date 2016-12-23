app.controller('ordersHistoryCtrl', [
    '$scope',
    '$modal',
    'historyData',
    'OrdersHistoryData',
    '$filter',
    'FileSaver',
    function ($scope, $modal, historyData, OrdersHistoryData, $filter, FileSaver) {
        var deliveryTypes = {
            '-1': ' ',
            1: 'Доставка',
            2: 'Курьер',
            3: 'Вывоз'
        };
        var statusList = {
            '-1': 'Неизвестный',
            2: "Создан",
            3: "Выгружен в veeroute",
            5: "Загружен в машину",
            7: "Доставлен",
            11: "Част. Доставлен",
            13: "Не доставлен",
            17: "Возвращён",
            19: "Част. Загружен",
            23: "Не загружен",
            29: "Част. Возвращён",
            31: "Принят"
        };
        $scope.items = (function (list) {
            var deliveryType, statusCode, barcode, number;
            list.forEach(function (item) {
                deliveryType = item.delivery_type || -1;
                statusCode = (item.status) ? (item['status']['code']) ? item['status']['code'] : -1 : -1;
                barcode = (item.items[0]) ? (item.items[0].barcode) ? item.items[0].barcode : '' : '';
                number = (item.number) ? item.number : '';
                item.humanReadable = {
                    'deliveryType': deliveryTypes[deliveryType],
                    'status': statusList[statusCode],
                    'barcode': barcode,
                    'number': number
                };
            });
            return list;
        }(historyData.data.orders));
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
        $scope.showInfo = function (item) {
            myModal.$promise.then(myModal.show);
        };
    }
]);