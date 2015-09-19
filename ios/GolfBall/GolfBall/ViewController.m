//
//  ViewController.m
//  GolfBall
//
//  Created by Anton Shevchenko on 2015-09-19.
//  Copyright © 2015 GolfBall. All rights reserved.
//

#import "ViewController.h"
#import "BluetoothConnectionManager.h"

@interface ViewController () <BluetoothConnectionManagerDelegate>

@property (nonatomic, strong) BluetoothConnectionManager *manager;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    _manager = [[BluetoothConnectionManager alloc] initWithDelegate:self];
    [_manager scanForGolfBalls];
    
}

-(void)bluetoothConnectionManager:(BluetoothConnectionManager *)manager didFindGolfBall:(GolfBall *)golfBall {
    
    
    UILabel  *golfBallLabel = [[UILabel alloc] initWithFrame:CGRectMake(40, 70, 300, 50)];
    golfBallLabel.text = golfBall.name;
    [self.view addSubview:golfBallLabel];
}
    

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
