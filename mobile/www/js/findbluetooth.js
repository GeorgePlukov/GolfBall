app.controller('bluetoothCtrl', function($ionicPlatform, $interval, $scope) {

    $ionicPlatform.ready(function() {

        $scope.golfBalls = [];

        ble.startScan([], function(device) {
            // console.log(device.name.substring(0,4) || 'undefined');
            if (device.name == undefined) {

            } else {
                if (device.name.substring(0, 4) == 'GOLF') {
                    if ($scope.golfBalls.length == 0) {
                        $scope.golfBalls.push(device);
                    } else {
                        for (var i = 0; i < $scope.golfBalls.length; i++) {
                            if (device.name == $scope.golfBalls[i].name) {
                                break;
                            }
                            if (i == $scope.golfBalls.length - 1) {
                                $scope.golfBalls.push(device);
                            }
                        }
                    }
                    console.log($scope.golfBalls);
                }
            }
        });
    })

})
