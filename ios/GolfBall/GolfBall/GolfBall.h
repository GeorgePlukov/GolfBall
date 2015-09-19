//
//  GolfBall.h
//  GolfBall
//
//  Created by Anton Shevchenko on 2015-09-19.
//  Copyright © 2015 GolfBall. All rights reserved.
//

#import <Foundation/Foundation.h>
@import CoreBluetooth;

@interface GolfBall : NSObject

@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) CBPeripheral *peripheral;

- (id)initWithPeripheral:(CBPeripheral *)peripheral;

@end
