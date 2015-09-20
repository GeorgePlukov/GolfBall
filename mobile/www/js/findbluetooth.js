app.controller('bluetoothCtrl', function($ionicPlatform, $ionicPopup, $ionicLoading, $interval, $scope, $timeout) {

    $ionicPlatform.ready(function() {




        var firstTimeConnecting = true;
        var secondTime = true;
        $scope.golfBalls = [];
        $scope.golfBall = null;
        $scope.popup = null;
        $scope.hole = 1;
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

            $scope.searchInterval = $interval(function(){
              ble.startScan([], function(device){
                     if (device.name != undefined) {

                        if(device.name.substring(0,4) == 'GOLF'){
                            $scope.golfBall = device;
                            $scope.golfBalls = [device];
                            if(firstTimeConnecting){
                                showPopup();
                            }
                            else{
                                updateScore(device);
                            }
                            
                               ble.stopScan(
                                    function() { console.log("Scan complete"); },
                                    function() { console.log("stopScan failed"); }
                                );
                        }

                        if(device.name.substring(0,4) == 'HOLE'){

                            if(device.name.split(":")[1] == 'true'){
                                 connectToGolfBall($scope.golfBall);
                            }
                           
                        }



                    }
                }, function(){

                });

            }, 500)
  
        }


        $scope.searchUnpaired();



        function showPopup() {
            firstTimeConnecting = false;
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
           $scope.holes[$scope.hole-1]['score'] = $scope.score;
        }

        function connectToGolfBall(golfBall) {
            if (firstTimeConnecting) {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><p class="text-no-margin">Connecting to golf ball...</p>'
                });
            }
            $interval.cancel($scope.searchInterval);

            $timeout(function(){
             ble.connect(golfBall.id, function(success) {
                if ($scope.popup) {
                    $scope.popup.close();
                }
                $scope.golfBall = golfBall;
                if (!secondTime) {
                    $scope.hole++;
                }
                updateScore(golfBall);
                if (secondTime) {
                    $ionicLoading.hide();
                    $ionicLoading.show({
                        template: '<i class="icon ion-android-checkmark-circle"><p class="text-no-margin">Connected!</p>',
                        duration: 1500
                    });
                }
                secondTime = false;

                ble.disconnect(golfBall.id, function(success) {
                    //$scope.searchUnpaired();
                     $scope.searchUnpaired();
                    console.log('Disconnect ball successful');
                }, function(error) {
                     $scope.searchUnpaired();
                    console.log('ERROR: Disconnect ball');
                });
            }, function(error) {
                $ionicLoading.hide();
                console.log(error)
                 $scope.searchUnpaired();
                if (secondTime) {
                    var errorPopup = $ionicPopup.alert({
                        title: 'Connection Error',
                        template: 'Can\'t connect to the golf ball.'
                    });
                    errorPopup.then(function() {
                    
                    });
                }
                secondTime = false;
            });

            }, 0);
           
        }

        // Scan for golf balls from the start
       // scanForGolfBalls();

    });

});
