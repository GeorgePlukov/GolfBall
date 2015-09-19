app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $interval, $scope) {

    $ionicPlatform.ready(function() {

        $scope.golfBalls = [];
        $scope.holes1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        $scope.holes2 = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];
        $scope.pars = ['4', '4', '5', '3', '4', '3', '4', '4', '5'];
        $scope.scores = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
        $scope.frontNine = true;
        
        if (window.cordova) {

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
        }

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

        $scope.changeNine = function() {
            $scope.frontNine = !$scope.frontNine;
        }


    });



});
