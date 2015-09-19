app.controller('loginCtrl', function($scope, $localStorage, $state) {
    $scope.facebook = function(){
        var ref = new Firebase("https://vivid-heat-2764.firebaseio.com");
        ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $localStorage.authData = authData;
            $state.go('findbluetooth')
          }
        });
    }
});
