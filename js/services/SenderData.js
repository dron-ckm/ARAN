app.service('SenderData', ['$http','Restangular','$cacheFactory', function($http,Restangular,$cacheFactory){
    var nameAndPhoneDelimiter=" | ";
    var companyCache={};// restangular объект, наполняется методами самим restangular-ом и содержит response-данные
	var _rest = Restangular.withConfig(config).service("companies");
    var restCompanyCache = $cacheFactory("companyCache"); // rest cache
    function config(RestangularConfigurer) {
        RestangularConfigurer.setDefaultHttpFields({
            cache: restCompanyCache
        });
        RestangularConfigurer.setResponseExtractor(function (response, operation) {
            if ("getList" === operation) {
                return response.companies
            } else {
                if ([
                        "get",
                        "post",
                        "put",
                        "save"
                    ].indexOf(operation) >= 0) {
                    return response.company
                } else {
                    return response
                }
            }

        });
        RestangularConfigurer.setErrorInterceptor(function (response, e) {
            e.reject()
        });
        RestangularConfigurer.addElementTransformer("companies", true, function (element) {
            element.addRestangularMethod("getCompany", "get", "me");
            return element
        });
        RestangularConfigurer.addResponseInterceptor(function (data, operation) {
            if ([
                    "put",
                    "post",
                    "delete"
                ].indexOf(operation) >= 0) {
                restCompanyCache.removeAll()
            }
            return data
        })
    }
    function transformSender(sender) {
        // из контроллера в формат апи
        return {
            apartment:sender.apartment, // квартира/офис
            building:sender.building,// строение
            city:sender.city,// город
            district:sender.district,// район, хз район города либо район как часть области
            house:sender.house, // дом
            housing:sender.housing,// корпус
            name:sender.shopName,// название организации/магазина/ооо
            postal_code:sender.postal_code,//индекс
            region:sender.region,// регион/область
            // Представитель (ФИО), но будем пока запихивать туда и телефон через разделитель
            representative:(function (name,phone) {
                var strArr=[];
                (name&&name.length)?strArr.push(name):true;
                (phone&&phone.length)?strArr.push(phone):true;
                return strArr.join(nameAndPhoneDelimiter);
            })(sender.contactName,sender.phone),
            street:sender.street, // улица,
            phone:sender.phone  // пока не работает
        };
    }
	function addData(sender){
        companyCache.places_loading.push(transformSender(sender));
        return companyCache.save();
    }
    function rmSender(id) {
        companyCache.places_loading.splice(id,1);
        return companyCache.save();
    }
    function saveAll(senders) {
        if (senders.length) {
            companyCache.places_loading = senders.map(function (oneSender) {
                return transformSender(oneSender);
            });
        }
        return companyCache.save();
    }
	function parse(response) {
	    // разбор places_loading
	    companyCache=response;
        return response.places_loading.map(function (place,id) {
            // костыль - пока нет поля для телефона придется хранить в поле представителя
            var nameAndPhone;
            nameAndPhone=(place.representative&&place.representative.length)?place.representative.split(nameAndPhoneDelimiter):[];
            return {
                id:id,
                city: place.city,
                addressFrom: (function (street,house,office) {
                    var str=(street&&street.length)?'ул. '+street:'';
                    str+=(house&&house.length)?', д. '+house:'';
                    str+=(office&&office.length)?', оф. '+office:'';
                    return str;
                })(place.street,place.house,place.apartment),
                street:place.street,
                house:place.house,
                apartment:place.apartment,
                phone: nameAndPhone[1]||' ',
                contactName: nameAndPhone[0]||' ',
                shopName: place.name
            }
        });
    }
    function getData() {
        return _rest.one("me").get();
    }
	return {
	    parse:parse,
		rmSender:rmSender,
		getData:getData,
		saveAll:saveAll,
		addData: addData
	};
}]);