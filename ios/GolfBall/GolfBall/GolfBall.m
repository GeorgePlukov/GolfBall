//
//  GolfBall.m
//  GolfBall
//
//  Created by Anton Shevchenko on 2015-09-19.
//  Copyright © 2015 GolfBall. All rights reserved.
//

#import "GolfBall.h"

@implementation GolfBall

- (id)initWithPeripheral:(CBPeripheral *)peripheral {
    self = [super init];
    if (self) {
        _name = peripheral.name;
        _peripheral = peripheral;
    }
    return self;
}

@end
