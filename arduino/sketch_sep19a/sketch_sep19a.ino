int sensorValue;
int sensorLow = 1023;
int sensorHigh = 0;
int previousLight;
const int sensorPowerPin = 4;


void setup() {
  
  Bean.enableConfigSave(false);

  // put your setup code here, to run once:
  pinMode(sensorPowerPin, OUTPUT);
  
  Bean.setBeanName("HOLE:false");
  
  digitalWrite(sensorPowerPin, HIGH);
  
  while (millis() < 600){
    sensorValue = analogRead(A0);

    if (sensorValue > sensorHigh){
      sensorHigh = sensorValue;
      
    }
    if (sensorValue < sensorLow){
      sensorLow = sensorValue;
    }
  }
  previousLight = sensorValue;
  
} 


void loop() {
  
  // put your main code here, to run repeatedly:
  sensorValue = analogRead(A0);

  // TUrn the LED on when the change in sensor value goes down a large amount quickly
  if ((previousLight - sensorValue) > 50){
    Bean.setBeanName("HOLE:true" );

  }
  // Turn the led off when the sensor goes up a large amount
  if ((sensorValue - previousLight) > 25){
    Bean.setBeanName("HOLE:false");
  }
  previousLight = sensorValue;

}








