app.controller('bluetoothCtrl', function($ionicPlatform, $ionicModal, $ionicPopup, $ionicLoading, $interval, $scope, $timeout) {

    $ionicPlatform.ready(function() {

        var firstTimeConnecting = true;
        $scope.golfBalls = [];
        $scope.golfBall = null;
        $scope.popup = null;
        $scope.hole = null;
        $scope.score = 'n/a';
        $scope.holes = [{
            hole: 1,
            par: 4,
            score: null
        }, {
            hole: 2,
            par: 4,
            score: null
        }, {
            hole: 3,
            par: 5,
            score: null
        }, {
            hole: 4,
            par: 3,
            score: null
        }, {
            hole: 5,
            par: 4,
            score: null
        }, {
            hole: 6,
            par: 3,
            score: null
        }, {
            hole: 7,
            par: 4,
            score: null
        }, {
            hole: 8,
            par: 4,
            score: null
        }, {
            hole: 9,
            par: 5,
            score: null
        }, {
            hole: 10,
            par: 4,
            score: null
        }, {
            hole: 11,
            par: 5,
            score: null
        }, {
            hole: 12,
            par: 5,
            score: null
        }, {
            hole: 13,
            par: 3,
            score: null
        }, {
            hole: 14,
            par: 4,
            score: null
        }, {
            hole: 15,
            par: 4,
            score: null
        }, {
            hole: 16,
            par: 5,
            score: null
        }, {
            hole: 17,
            par: 5,
            score: null
        }, {
            hole: 18,
            par: 4,
            score: null
        }, ];
        $scope.stats = {
            first: '31 Par',
            second: '12 Birdie',
            third: '6 Bogey'
        };


        
        $scope.searchUnpaired = function(){

            // bluetoothSerial.discoverUnpaired(function(data) {
            //     $scope.searchUnpaired();
            // }, function(err){
            //     console.log("error", err);
            // })

            // bluetoothSerial.setDeviceDiscoveredListener(function(device) {
            //      if (device.name != undefined) {

            //         if(device.name.substring(0,4) == 'GOLF'){
            //             updateScore(device);
            //         }

            //     }
            // });

            $interval(function(){
              ble.startScan([], function(device){
                     if (device.name != undefined) {

                        if(device.name.substring(0,4) == 'GOLF'){
                            updateScore(device);
                               ble.stopScan(
                                    function() { console.log("Scan complete"); },
                                    function() { console.log("stopScan failed"); }
                                );
                        }



                    }
                }, function(){

                });

          

            }, 500)
  
        }


        $scope.searchUnpaired();



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

        function updateScore(device) {
            var score = device.name;
            score = score.substring(score.indexOf(':') + 1, score.indexOf(','));
            $scope.score = score;
            console.log(device);
            $timeout(function() {
                $scope.$digest();
            });
           // $scope.holes[$scope.hole]['score'] = $scope.score;
        }

        function connectToGolfBall(golfBall) {
            if (firstTimeConnecting) {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><p class="text-no-margin">Connecting to golf ball...</p>'
                });
            }
            ble.connect(golfBall.id, function(success) {
                if ($scope.popup) {
                    $scope.popup.close();
                }
                $scope.golfBall = golfBall;
                if ($scope.hole == null) {
                    $scope.hole = 0;
                } else {
                    $scope.hole++;
                }
                updateScore();
                if (firstTimeConnecting) {
                    $ionicLoading.hide();
                    $ionicLoading.show({
                        template: '<i class="icon ion-android-checkmark-circle"><p class="text-no-margin">Connected!</p>',
                        duration: 1500
                    });
                }
                firstTimeConnecting = false;

                ble.disconnect(golfBall.id, function(success) {
                    console.log('Disconnect ball successful');
                }, function(error) {
                    console.log('ERROR: Disconnect ball');
                });
            }, function(error) {
                $ionicLoading.hide();
                if (firstTimeConnecting) {
                    var errorPopup = $ionicPopup.alert({
                        title: 'Connection Error',
                        template: 'Can\'t connect to the golf ball.'
                    });
                    errorPopup.then(function() {
                        //scanForGolfBalls();
                    });
                }
                firstTimeConnecting = false;
            });
        }

        $scope.betFriend = function() {
          $ionicModal.fromTemplateUrl('views/betfriend.html', { scope: $scope }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
          });
        };

        // Modal
        $scope.hideBetFriend = function() {
          $scope.modal.remove();
        };

        // Scan for golf balls from the start
        // scanForGolfBalls();

    });

});
