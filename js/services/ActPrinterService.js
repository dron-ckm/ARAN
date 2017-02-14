app.factory('ActPrinterService', [
    'Restangular',
    /**
     *
     * @param Restangular
     * @returns {{start: ActPrinterService.start, checkState: ActPrinterService.checkState, finish: ActPrinterService.finish}}
     */
        function (Restangular) {
        function config(t) {
        }

        var rest = Restangular.withConfig(config).service("incomings/act-of-receiving-and-transmitting");
        var task = reset(rest);
        function reset(rest) {
            return {
                rest:rest,
                isWorking: false,
                taskId: false,
                taskState: '',
                taskStatus: false,
                maxRetry: 100,
                checkTimeout: 5000,
                filePath: '',
                file:'',
                start:function (ids) {
                    var that = this;
                    if (Array.isArray(ids) && ids.length > 0) {
                        that.isWorking = true;
                        that.rest.post({
                            'incomings': ids
                        }).then(function (response) {
                            if (response && response.taskId) {
                                that.taskId=response.taskId;
                                that.recursive();
                            }
                        })
                    }
                },
                statusCheck:function() {
                    return this.rest.get(this.taskId + '/status');
                },
                isFinished:function() {
                    return this.taskStatus === true;
                },
                getFile:function() {
                    this.rest.get(this.taskId + '/file').then(function (response) {
                        console.log('file');
                        console.log(response);
                    })
                },
                recursive:function() {
                    var that = this;
                    that.statusCheck().then(function (response) {
                        console.log(response);
                        if ('state' in response) {
                            that.taskState = response.state;
                        }
                        if ('status' in response) {
                            that.taskStatus = response.status;
                        }
                        if (!that.isFinished() && that.maxRetry) {
                            setTimeout(function () {
                                that.recursive();
                            }, that.checkTimeout);
                        } else {
                            that.getFile();
                        }
                        that.maxRetry--;
                    })
                }
            }
        }

        return {
            start: function (ids) {
                task = reset(rest);
                task.start(ids);
            },
            checkState: function () {
                return task.isWorking;
            },
            finish: function () {
                return (task.isWorking)?false:task.file;
            }
        }
    }
]);