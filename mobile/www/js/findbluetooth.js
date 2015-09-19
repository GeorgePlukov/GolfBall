app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $ionicLoading, $interval, $scope) {

    $ionicPlatform.ready(function() {

        $scope.golfBalls = [];
        $scope.golfBall = null;
        $scope.popup = null;
        $scope.score = 'n/a';
        $scope.holes = [
            { hole: 1, par: 4, score: null },
            { hole: 2, par: 4, score: null },
            { hole: 3, par: 5, score: null },
            { hole: 4, par: 3, score: null },
            { hole: 5, par: 4, score: null },
            { hole: 6, par: 3, score: null },
            { hole: 7, par: 4, score: null },
            { hole: 8, par: 4, score: null },
            { hole: 9, par: 5, score: null },
            { hole: 10, par: 4, score: null },
            { hole: 11, par: 5, score: null },
            { hole: 12, par: 5, score: null },
            { hole: 13, par: 3, score: null },
            { hole: 14, par: 4, score: null },
            { hole: 15, par: 4, score: null },
            { hole: 16, par: 5, score: null },
            { hole: 17, par: 5, score: null },
            { hole: 18, par: 4, score: null },
        ];
        $scope.stats = {
          first: '31 Par',
          second: '12 Birdie',
          third: '6 Bogey'
        };

        function scanForGolfBalls() {
        
        if(window.ble === undefined) return;

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
                console.log('Yo');
                $scope.popup.close();
            }
            $scope.popup = $ionicPopup.show({
                template: 'Connect to a Golf ball:',
                scope: $scope,
                buttons: $scope.golfBalls.map(function(golfBall) {
                    return {
                        text: golfBall.name,
                        type: 'button-positive',
                        onTap: function() {
                            return connectToGolfBall(golfBall);
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
                if ($scope.popup) {
                    $scope.popup.close();
                }
                $scope.golfBall = golfBall;
                $scope.score = 0;
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
