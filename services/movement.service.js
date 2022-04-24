/**
 * Evaluate the max coordinates to X or Y is size 50
 */
const validateMovementMaxRange = (xCoordinate = 0, yCoordinate = 0) => {

    if (xCoordinate > 50 || yCoordinate > 50) {
        return {
            hasError: true,
            msgError: 'You reached the maximum movement range'
        }
    }

    return {
        hasError: false,
        msgError: ''
    }
}

/**
 * Gets the robot direction is on X or Y
 */
const getMovementDirection = (coordinate = '') => {

    let movement = '';

    switch (coordinate) {
        case 'N':
        case 'S':
            movement = 'Y'
            break;
        case 'E':
        case 'W':
            movement = 'X'
            break;
    }

    return movement;

}

/**
 *  Transform the orientation L, R , F into +1 or -1 movement
 */
const getTransformOrientation = (orientation = []) => {
    let oTransformed = [];

    orientation.forEach((o, i) => {
        switch (o) {
            case 'L':
                oTransformed.push('-1');
                break;
            case 'R':
                oTransformed.push('1');
                break;
            case 'F':
                let prevOri = oTransformed[i - 1];
                if (prevOri == null) {
                    prevOri = '1'
                }
                oTransformed.push(prevOri);
                break;
        }
    })

    return oTransformed;
}

/**
 * Get robots move
 */
const getRobotMoves = (coordinate = 0, moves = []) => {
    let isLost = false;
    let resultCoord = coordinate;

    for (let m of moves) {
        resultCoord = parseInt(resultCoord) + parseInt(m);
        if (resultCoord < 0) {
            isLost = true;
            break
        }
    }

    return {
        isLost,
        resultCoord
    };

}

module.exports = {
    validateMovementMaxRange,
    getMovementDirection,
    getTransformOrientation,
    getRobotMoves
}