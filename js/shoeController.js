var shoeApp = angular.module('shoeApp', [])
.controller('ShoeDescriptionCtrl',['$scope', function ($scope) {
  $scope.shoes = [
    {'category':'Oxford',
     'model': 'Acqua di Andes',
     'style': 'EP1107',
     'description': 'Drapped fabrick ballet flat with a touch of funny lock and key accesories, leather lining and foam cushioning that will mayour walk comfortable.',
     'color': ['blue','red']},
    {'category':'Oxford',
     'model': 'Nexus S',
     'style': 'Fast just got faster with Nexus S.',
     'description': 'huehue',
     'color': ['','']},
    {'category':'Oxford',
     'model': 'Nexus S',
     'style': 'Fast just got faster with Nexus S.',
     'description': 'huehue',
     'color': ['','']}
  ];
}])
.directive("shoeDescription", function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "template.html"
  };
});
