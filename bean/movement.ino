

// When acceleration change goes beyond this threshold, the LED will blink.
#define THRESHOLD 100

AccelerationReading previousAccel;
int scoreTracker = 0;
int timer = 0;

void setup() {
  // Turn off the Bean's LED
  Bean.setLed(0, 0, 0);  
  // Initial reading  
  previousAccel = Bean.getAcceleration(); 
}

void loop() {
  // Get the current acceleration with a conversion of 3.91×10-3 g/unit.
  AccelerationReading currentAccel = Bean.getAcceleration();   
  int totalAcceleration = abs(currentAccel.xAxis) + abs(currentAccel.yAxis) + abs(currentAccel.zAxis);
  
  
  
  // Find the difference between the current acceleration and that of 200ms ago.
  int accelDifference = getAccelDifference(previousAccel, currentAccel); 
  // Update previousAccel for the next loop.   
  previousAccel = currentAccel;
  
  if(accelDifference > THRESHOLD){
      
      if((totalAcceleration > 500) && (timer > 1000)){
        scoreTracker = scoreTracker + 1;
        Serial.println(scoreTracker);
        timer = 0;
        Bean.sleep(1000);
      }
      
      else{
       timer = 0;
       Bean.sleep(100); 
      }
      

  }
  
  else{
   timer = timer + 100;
   Bean.sleep(100);
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