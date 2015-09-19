//
//  BluetoothConnectionManager.h
//  GolfBall
//
//  Created by Anton Shevchenko on 2015-09-19.
//  Copyright © 2015 GolfBall. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GolfBall.h"

@interface BluetoothConnectionManager : NSObject

@property (nonatomic, assign) id delegate;

- (id)initWithDelegate:(id)delegate;
- (void)scanForGolfBalls;
- (void)connectToGolfBall:(GolfBall *)golfBall;

@end

@protocol BluetoothConnectionManagerDelegate <NSObject>

@optional
- (void)bluetoothConnectionManager:(BluetoothConnectionManager *)manager didFindGolfBall:(GolfBall *)golfBall;
- (void)bluetoothConnectionManager:(BluetoothConnectionManager *)manager didConnectToGolfBall:(GolfBall *)golfBall;

@end
