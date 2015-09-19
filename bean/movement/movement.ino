

// When acceleration change goes beyond this threshold, the LED will blink.
#define THRESHOLD 100

AccelerationReading previousAccel;
int scoreTracker = 0;
int timer = 0;

void setup() {
  // Turn off the Bean's LED
  Bean.setLed(0, 0, 0);
  Bean.enableConfigSave(false);
  // Initial reading  
  previousAccel = Bean.getAcceleration(); 
}

void loop() {
  // Get the current acceleration with a conversion of 3.91×10-3 g/unit.
  AccelerationReading currentAccel = Bean.getAcceleration();   
  int totalAcceleration = abs(currentAccel.xAxis) + abs(currentAccel.yAxis) + abs(currentAccel.zAxis);
  
  bool connected = Bean.getConnectionState();
  
  if(connected){
    
    scoreTracker = 0;
    String message = String(scoreTracker, DEC)  + "," + String(totalAcceleration, DEC);
    Bean.setBeanName("GOLF:" + message);
    Bean.sleep(100);
    
  }
  
  // Find the difference between the current acceleration and that of 200ms ago.
  int accelDifference = getAccelDifference(previousAccel, currentAccel); 
  // Update previousAccel for the next loop.   
  previousAccel = currentAccel;
  
  if(accelDifference > THRESHOLD){

      if((totalAcceleration > 300) && (timer > 100)){
        
        scoreTracker = scoreTracker + 1;
        String message = String(scoreTracker, DEC)  + "," + String(totalAcceleration, DEC);
        //Serial.println(message);
        Bean.setBeanName("GOLF:" + message);
        timer = 0;
        Bean.sleep(3000);
      }
      
      else{

       timer = 0;
       Bean.sleep(50);
      
       
      }
      

  }
  
  else{

   timer = timer + 50;
   if(timer > 3000){
    timer = 3000; 
   }
   Bean.sleep(50);
  }
  
  
  // Check if the Bean has been moved beyond our threshold.

}

// This function calculates the difference between two acceleration readings
int getAccelDifference(AccelerationReading readingOne, AccelerationReading readingTwo){
  int deltaX = abs(readingTwo.xAxis - readingOne.xAxis);
  int deltaY = abs(readingTwo.yAxis - readingOne.yAxis);
  int deltaZ = abs(readingTwo.zAxis - readingOne.zAxis);
  // Return the magnitude
  return deltaX + deltaY + deltaZ;   
}
