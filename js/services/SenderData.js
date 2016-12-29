app.service('SenderData', ['$http','Restangular', function($http,Restangular){

	var senders = [{
		city: '1M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop'
	},{
		city: '2M',
		addressFrom: 'asd',
		phone: '800',
		contactName: 'name',
		shopName: 'shop2'
	}];
	var _rest = Restangular.withConfig(config).service("companies");
    function config(t) {
        t.setResponseInterceptor(function (data, operation, model, url, response, deferred) {
            if ([
                    "application/octet-stream",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/pdf"
                ].indexOf(response.headers("Content-Type")) >= 0) {
                return data;
            }
            var n;
            if ("getList" === operation) {
                n = data.orders;
                n.count = data.count;
                return n
            } else {
                return data.order
            }
        });
        t.addErrorInterceptor(function (response, e, i) {
            if (400 !== response.status) {
                return true
            } else {
                response.data && response.data.msg && toastr.error(response.data.msg);
                e.reject();
                return false
            }
        });
    }
    function getDataRest() {
	    return _rest.one("me").get()
    }
	function getData(){
		return senders
	}
	function addData(newSender){
		senders.push(newSender);
	}
	return {
		getDataRest:getDataRest,
		getData: getData,
		addData: addData
	};
}]);