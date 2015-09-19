app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $ionicLoading, $interval, $scope) {

    $ionicPlatform.ready(function() {

        $scope.golfBalls = [];
        $scope.golfBall = null;

        function scanForGolfBalls() {
            ble.startScan([], function(device) {
                console.log('New device: ' + device);
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
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner><p class="text-no-margin">Connecting to golf ball...</p>'
            });
            ble.connect(golfBall.id, function(success) {
                $scope.golfBall = golfBall;
                $ionicLoading.hide();
                $ionicLoading.show({
                    template: '<i class="icon ion-android-checkmark-circle"><p class="text-no-margin">Connected!</p>',
                    duration: 1500
                });
            }, function(error) {
                $ionicLoading.hide();
                var errorPopup = $ionicPopup.alert({
                    title: 'Connection Error',
                    template: 'Can\'t connect to the golf ball.'
                });
                errorPopup.then(function() {
                    scanForGolfBalls();
                });
            });
        }

        // Scan for golf balls from the start
        scanForGolfBalls();

    });

});
