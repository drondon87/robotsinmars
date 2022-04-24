const { Router } = require("express");
const { movementPOST } = require("../controllers/movement.controller");
const { check } = require('express-validator');
const { validateFields, validateCoord, validateMovements } = require("../middlewares/validate-fields");

const router = Router();

router.post('/', [
    check('coordinates', 'Coordinates is required').not().isEmpty(),
    check('coordinates').custom(validateCoord),
    check('orientation', 'Orientation is required').not().isEmpty(),
    check('orientation').custom(validateMovements),
    validateFields
], movementPOST);

module.exports = router;