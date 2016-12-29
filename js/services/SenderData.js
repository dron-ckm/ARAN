app.service('SenderData', ['$http','Restangular','$cacheFactory', function($http,Restangular,$cacheFactory){
    var companyCache={};
	var _rest = Restangular.withConfig(config).service("companies");
    function config(RestangularConfigurer) {
        RestangularConfigurer.setDefaultHttpFields({
            cache: companyCached
        });
        RestangularConfigurer.setResponseExtractor(function (t, e, o) {
            return "nomenclature" === o ? t.nomenclatures : "getList" === e ? t.companies : [
                        "get",
                        "post",
                        "put",
                        "save"
                    ].indexOf(e) >= 0 ? t.company : t
        });
        RestangularConfigurer.setErrorInterceptor(function (response, e) {
            if (response.data && response.data.msg) {
                response.data.msg
            }
            e.reject()
        });
        RestangularConfigurer.addElementTransformer("companies", true, function (element) {
            return element.addRestangularMethod("getCompany", "get", "me"), element
        });
        RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, n) {
            if (response.data && response.data.msg) {
                response.data.msg
            }
            if ([
                    "put",
                    "post",
                    "delete"
                ].indexOf(operation) >= 0) {
                companyCached.removeAll()
            }
            return data
        })
    }
    var companyCached = $cacheFactory("companyCache"); // rest cache
    function transformSender(sender) {
        return {
            apartment:null,
            building:null,
            city:sender.city,
            district:null,
            house:null,
            housing:null,
            name:sender.shopName,
            region:null,
            representative:sender.contactName,
            street:sender.addressFrom
        };
    }
	function addData(sender){
        companyCache.places_loading.push(transformSender(sender));
        return companyCache.save();
    }
    function rmSender(id) {
        companyCache.places_loading.splice(id,1);
        console.log(companyCache.places_loading.length);
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
	    companyCache=response;
        return response.places_loading.map(function (place,id) {
            return {
                id:id,
                city: place.city,
                addressFrom: [place.street,place.district,place.house].join(', '),
                phone: ' ',
                contactName: place.representative,
                shopName: place.name
            }
        });
    }
	return {
	    parse:parse,
		rmSender:rmSender,
		getData:function () {
            return _rest.one("me").get()
        },
		saveAll:saveAll,
		addData: addData
	};
}]);