# Muber--Ride-Booking-API
This is an API based on a Cab Booking Service which can be used by anyone and everyone..

The API consists of a databse of the drivers available in the world and based on your location(longitudes,latitiudes) calculates the driver closest to you.

This API is written in Node.Js, Express.Js, Mongoose.Js and MongoDB

## Prerequisites: 
Firstly Clone the repository in your computer and open the command line in the folder.
Then run ```npm install``` to install all the dependencies

## Utilities Provided by the API: 
### Create a Driver with a Driving Status and Location on the World Map
### Edit a Driver Pre-Exisiting in the database
### Delete a Driver from the Database
### Find the Details of the Driver closesr=t to your Location Ready to Drive

## How to Start:
Run ```npm run start``` in the Project Directory

## How to Use: 

### Creating a Driver: 
Open ```localhost:3000/api/driver``` with a POST Request with the Driver Details as shown in the Driver Model enclosed in a JSON Object

### Editing a Driver: 
Open ```localhost:3000/api/driver/{driver id}``` with a PUT Request with the Driver Details as shown in the Driver Model enclosed in a JSON Object

### Deleting a Driver: 
Open ```localhost:3000/api/driver/{driver id}``` with a DELETE Request with the Driver ID enclosed in a JSON Object

### Getting the Driver Ready to Drive for You
Open ```localhost:3000/api/drivers?lng={longitude}&lat={latitude}``` with a GET Request with the Latitude and Longitude of your location int the Request
