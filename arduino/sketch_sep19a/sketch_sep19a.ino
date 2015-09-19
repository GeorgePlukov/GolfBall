int sensorValue;
int sensorLow = 1023;
int sensorHigh = 0;

const int ledPin = 8;

void setup() {
  Serial.begin(9600);
  
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);

  while (millis() < 5000){
    sensorValue = analogRead(A0);
    
    if (sensorValue > sensorHigh){
      sensorHigh = sensorValue;
    }
    if (sensorValue < sensorLow){
      sensorLow = sensorValue;
    }
  }
  digitalWrite(ledPin, LOW);
  
} 

void loop() {
  // put your main code here, to run repeatedly:
  sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  if (sensorValue > 0){
    digitalWrite(ledPin, HIGH);
  }
}








