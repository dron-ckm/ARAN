app.service('OrderStatusService', function () {
    function getLabel(code) {
        return statusList[parseInt(code)] ? statusList[parseInt(code)] : "Неизвестный"
    }

    function getList() {
        var result = [];
        angular.forEach(statusList, function (value, key) {
            result.push({
                'code': key,
                'name': value
            });
        });
        return result;
    }

    var statusList = {
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
    return {
        getLabel: getLabel,
        getList: getList
    }
});