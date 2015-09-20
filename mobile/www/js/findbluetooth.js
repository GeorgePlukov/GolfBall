app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $ionicLoading, $interval, $scope, $timeout) {
    $ionicPlatform.ready(function() {
      $scope.navPosition = 50;
      $scope.currentPage = 0;

        $scope.$on('positionChange', function(event, x) {
            console.log(x)
            $('#slidingBar').css('left', -(x) / 2 + '%');

        });

        $interval(function(){
            $scope.slidingBar = parseInt(document.getElementById('1').style.transform.split("translate3d(")[1].split(",")[0].split("%")[0]);
        
        }, 10)
    });
});
