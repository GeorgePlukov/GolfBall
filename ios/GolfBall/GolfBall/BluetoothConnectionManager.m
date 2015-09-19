//
//  BluetoothConnectionManager.m
//  GolfBall
//
//  Created by Anton Shevchenko on 2015-09-19.
//  Copyright © 2015 GolfBall. All rights reserved.
//

#import "BluetoothConnectionManager.h"
@import CoreBluetooth;

@interface BluetoothConnectionManager () <BluetoothConnectionManagerDelegate, CBCentralManagerDelegate, CBPeripheralDelegate>

@property (nonatomic, strong) CBCentralManager *manager;
@property (nonatomic, strong) GolfBall *golfBall;

@end

@implementation BluetoothConnectionManager

- (id)initWithDelegate:(id)delegate {
    self = [super init];
    if (self) {
        _manager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
        _delegate = delegate;
    }
    return self;
}

# pragma mark BluetoothConnectionManager Methods
- (void)scanForGolfBalls {
    CBUUID *golfBallUUID = [CBUUID UUIDWithString:@"uuid"];
    [_manager scanForPeripheralsWithServices:@[golfBallUUID] options:nil];
}

- (void)connectToGolfBall:(GolfBall *)golfBall {
    _golfBall = golfBall;
    [_manager connectPeripheral:_golfBall.peripheral options:nil];
    [_manager stopScan];
}

# pragma mark CBCentralManagerDelegate Methods
- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
    NSLog(@"New State");
}

- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary<NSString *,id> *)advertisementData RSSI:(NSNumber *)RSSI {
    GolfBall *golfBall = [[GolfBall alloc] initWithPeripheral:peripheral];
    [_delegate bluetoothConnectionManager:self didFindGolfBall:golfBall];
}

- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral {
    peripheral.delegate = self;
    [_delegate bluetoothConnectionManager:self didConnectToGolfBall:_golfBall];
    NSLog(@"Connected to GolfBall");
}

@end
