app.factory('RestOrdersService', ['Restangular', function(Restangular){
    function i(t) {
        t.setResponseInterceptor(function (t, e, o, i, r, l) {
            if ([
                    "application/octet-stream",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ].indexOf(r.headers("Content-Type")) >= 0) return t;
            var n;
            return "getList" === e ? (n = t.orders, n.count = t.count) : n = t.order, n
        });
        t.addErrorInterceptor(function (t, e, i) {
            if (400 !== t.status) {
                return true
            } else {
                return t.data && t.data.msg && toastr.error(t.data.msg), e.reject(), !1
            }
        });
    }

    return Restangular.withConfig(i).service("orders")
}]);