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
    function getAdditionalStatus(code) {
        return additionalStatusList[parseInt(code)] ? additionalStatusList[parseInt(code)] : " "
    }
    var additionalStatusList = {
        8: "Нет на адресе",
        16: "Отказ от заказа",
        32: "Бой",
        64: "Брак",
        128: "Не успели по времени",
        256: "Нет документов",
        512: "Нет денег",
        1024: "Не загружен"
    };
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
        getAdditionalStatus: getAdditionalStatus,
        getLabel: getLabel,
        getList: getList
    }
});