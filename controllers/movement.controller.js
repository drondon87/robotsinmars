const { response } = require("express");
const { request } = require("express");
const { Robot } = require('../models');
const { validateMovementMaxRange, getMovementDirection, getTransformOrientation, getRobotMoves } = require("../services/movement.service");

const movementPOST = async(req = request, res = response) => {

    // Declare variables
    let xCoord = 0;
    let yCoord = 0;
    let dCoord = '';
    let mCoord = '';
    let aOrientation = [];
    let atOrientation = [];
    let result = 0;
    let bodyResult = {};
    let data = {};

    // Get variables from the body
    const { coordinates, orientation } = req.body;

    // Split the variables to get X Y Coordinate (N, S, E, W)
    const aCoord = coordinates.split(' ');
    xCoord = aCoord[0];
    yCoord = aCoord[1];
    dCoord = aCoord[2];

    // Validate if the X & Y variables are in the specify range (top 50)
    const { hasError, msgError } = validateMovementMaxRange(xCoord, yCoord);

    if (hasError) {
        return res.status(400).json({
            errors: [{
                value: coordinates,
                msg: msgError
            }]

        })
    }

    // Get X or Y depends the coordinate (N, S, E, W)
    mCoord = getMovementDirection(dCoord);

    // Split orientation param into array
    aOrientation = orientation.replace(/\s+/g, '').split('');

    // Transform orientation array
    atOrientation = getTransformOrientation(aOrientation);

    if (mCoord === 'X') {
        result = getRobotMoves(xCoord, atOrientation);
        xCoord = result.resultCoord;
    } else {
        result = getRobotMoves(yCoord, atOrientation);
        yCoord = result.resultCoord;
    }

    // When the robots is lost , send initial coordinates into de the message
    if (result.isLost) {
        bodyResult = {
            msg: coordinates + ' LOST'
        }

        data = {
            coordinate: bodyResult.msg,
            movement: orientation,
            lost: true
        }

    } else {
        // Send the new coordinates
        bodyResult = {
            msg: xCoord + ' ' + yCoord + ' ' + dCoord,
        }

        data = {
            coordinate: bodyResult.msg,
            movement: orientation
        }
    }

    // Finds if the robot exists previously in the DB
    const robotDb = await Robot.findOne({ coordinate: bodyResult.msg });

    if (!robotDb) {
        const robot = new Robot(data);
        await robot.save();
    }

    // List only the lost robots
    const robots = await Robot.find({ lost: true });

    res.json({
        robots,
        ...bodyResult
    });
}

module.exports = {
    movementPOST
}