app.directive('boundModel', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      scope.$watch(attrs.boundModel, function(newValue, oldValue) {
        if(newValue != oldValue) {
          ngModel.$setViewValue(newValue);
          ngModel.$render();
        }
      });
    }
  };
})