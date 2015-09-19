int sensorValue;
int sensorLow = 1023;
int sensorHigh = 0;
int previousLight;
const int sensorPowerPin = 5;

void setup() {
  
  Serial.begin(57600);
  Bean.setLed(100,100,255);

  // put your setup code here, to run once:
  pinMode(sensorPowerPin, OUTPUT);
  digitalWrite(sensorPowerPin, HIGH);

  while (millis() < 2000){
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
  Serial.println(sensorValue);
  // TUrn the LED on when the change in sensor value goes down a large amount quickly
  if ((previousLight - sensorValue) > 50){
    Serial.println("SCORE: " +  String(previousLight - sensorValue, DEC));
    
  }
  // Turn the led off when the sensor goes up a large amount
  if ((sensorValue - previousLight) > 25){
    Serial.println("UNSCORE: " + String(sensorValue - previousLight, DEC));
  }
  previousLight = sensorValue;
  delay(500);
}








