# Robots in Mars Project

INSTALLATION
------------

Execute ``` npm install ``` to install required libraries

Execute ```nodemon app.js ``` to start a project in local

ENDPOINT
------------

Request: http://localhost:8080/api/movements

Method: POST

Example Body:

```JSON
{ 
    "coordinates":"3 2 N", 
    "orientation":"FFRFLL" 
} 
```

DATBASE
------------

MongoDB Database

- Name: robotsinmars
- Collection: robots

STARTING URL
------------

http://localhost:8080/