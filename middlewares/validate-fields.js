const { response } = require('express');
const { request } = require('express');
const { validationResult } = require('express-validator');

/**
 * Evaluate fields, return middleware errors or continue to the services
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 **/
const validateFields = (req = request, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();

}

/**
 * Validate:
 * Evaluates that the coordinates are 3 parameters
 * Evaluates that the initial coordinates are numeric
 * Evaluates that the coordinate are the allowed letter 
 * 
 *  @param {*} coordinates 
 **/
const validateCoord = async(coordinates = '') => {

    const coordinatesAllowed = ['N', 'S', 'E', 'W'];
    let arrayCoordinates = coordinates.split(' ');

    if (arrayCoordinates.length !== 3) {
        throw new Error(`Incorrect Coordenates Size`)
    }

    if (isNaN(arrayCoordinates[0]) || isNaN(arrayCoordinates[1])) {
        throw new Error(`Incorrect Coordenates Format`)
    }

    if (!coordinatesAllowed.includes(arrayCoordinates[2])) {
        throw new Error(`Some coordinates are not allowed`)
    }
}

/**
 * Evaluates that the movement are the allowed letters
 * @param {*} orientation 
 */
const validateMovements = async(orientation = []) => {

    const orientationsAllowed = ['L', 'R', 'F'];
    let isValid = true;
    orientation = orientation.replace(/\s+/g, '');

    for (let o of orientation) {
        if (!orientationsAllowed.includes(o)) {
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        throw new Error(`Some movements are not allowed`)
    }
}

module.exports = {
    validateFields,
    validateCoord,
    validateMovements
}