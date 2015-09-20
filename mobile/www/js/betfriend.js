app.controller('betFriendCtrl', function($scope) {
  $scope.placeBet = function() {
    $ionicModal.fromTemplateUrl('views/betpayment.html', { scope: $scope }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
});
