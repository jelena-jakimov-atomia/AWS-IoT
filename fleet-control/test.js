var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: "************",
    certPath: "**************",
    caPath: "***************",
    clientId: "************",
    host: "***********"
});

console.log("here");
const initialCoordinates = {
    lat: 46.6314609,
    lon: -99.34467
};

const endingCoordinates = {
    lat: 46.3602106,
    lon: -96.8319174
};

const driveTime = 2 * 60;
let counter = 0;
let endTime = new Date();
let rideId = Math.floor(Math.random()*1000);

while(counter < driveTime){
    
    
    let currentCoordinates = {
        lat: initialCoordinates.lat + (endingCoordinates.lat - initialCoordinates.lat),
        lon: initialCoordinates.lon + (endingCoordinates.lon - initialCoordinates.lon)
    };

    counter++;
    
    let message = {
        rideId: rideId,
        temperature: 77.2 + 0.02 * counter,
        timestamp: Math.floor(new Date(endTime.getTime()-(driveTime- counter))),
        location_lat: currentCoordinates.lat,
        location_lon: currentCoordinates.lon
    };
    
    device.publish('truck_sensor', JSON.stringify(message));
    console.log("down" + counter);
}

process.exit();