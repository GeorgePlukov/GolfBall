app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $interval, $scope) {

    $ionicPlatform.ready(function() {

        $scope.golfBalls = [];

        ble.startScan([], function(device) {
            // console.log(device.name.substring(0,4) || 'undefined');
            if (device.name == undefined) {

            } else {
                if (device.name.substring(0, 4) == 'GOLF') {
                    if ($scope.golfBalls.length == 0) {
                        $scope.golfBalls.push(device);
                        showPopup();
                    } else {
                        for (var i = 0; i < $scope.golfBalls.length; i++) {
                            if (device.name == $scope.golfBalls[i].name) {
                                break;
                            }
                            if (i == $scope.golfBalls.length - 1) {
                                $scope.golfBalls.push(device);
                                showPopup();
                            }
                        }
                    }
                    console.log($scope.golfBalls);
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
