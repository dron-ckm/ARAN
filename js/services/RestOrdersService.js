app.factory('RestOrdersService', [
    'Restangular',
    function (Restangular) {
        function config(t) {
            t.setResponseInterceptor(function (data, operation, model, url, response, deferred) {
                if ([
                        "application/octet-stream",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ].indexOf(response.headers("Content-Type")) >= 0) {
                    return data;
                }
                var n;
                if ("getList" === operation) {
                    n = data.orders;
                    n.count = data.count;
                    return n
                } else {
                    return data
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

        return Restangular.withConfig(config).service("orders")
    }
]);