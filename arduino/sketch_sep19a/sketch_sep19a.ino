int sensorValue;
int sensorLow = 1023;
int sensorHigh = 0;
int previousLight;
const int ledPin = 8;

void setup() {
  Serial.begin(9600);
  
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);

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
  digitalWrite(ledPin, LOW);
  
} 


void loop() {
  // put your main code here, to run repeatedly:
  sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  // TUrn the LED on when the change in sensor value goes down a large amount quickly
  if ((previousLight - sensorValue) > 50){
    Serial.println("LED ON: " +  String(previousLight - sensorValue, DEC));
    digitalWrite(ledPin, HIGH);
  }
  // Turn the led off when the sensor goes up a large amount
  if ((sensorValue - previousLight) > 50){
    Serial.println("LED OFF: " + String(sensorValue - previousLight, DEC));
    digitalWrite(ledPin, LOW);
  }
  previousLight = sensorValue;
  delay(750);
}








