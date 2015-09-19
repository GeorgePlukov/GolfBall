app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $interval, $scope) {

    $ionicPlatform.ready(function() {

        $scope.golfBalls = [];

        ble.startScan([], function(device) {
            if (device.name != undefined && device.name.substring(0, 4) == 'GOLF') {
              var isNewGolfBall = true;
              for (var i = 0; i < $scope.golfBalls.length; i++) {
                if (device.name == $scope.golfBalls[i].name) {
                  isNewGolfBall = false;
                }
              }
              if (isNewGolfBall) {
                  $scope.golfBalls.push(device);
                  showPopup();
              }
            }
        });

        function showPopup() {
          if ($scope.popup) {
            $scope.popup.close();
          }
          $scope.popup = $ionicPopup.show({
            template: 'Connect to a Golf ball:',
            scope: $scope,
            buttons: $scope.golfBalls.map(function(golfBall) {
              return {
                text: golfBall.name,
                onTap: function() {
                  connectToGolfBall(golfBall);
                }
              };
            })
          });
        }

        function connectToGolfBall(golfBall) {
          ble.stopScan();
          ble.connect(golfBall.id, function(success) {
            console.log('Connected to ball!');
          });
        }

    });

});
