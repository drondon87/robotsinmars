const { Schema, model } = require('mongoose');

const RobotSchema = Schema({
    coordinate: {
        type: String,
        required: [true, 'Coordinate is required']
    },
    movement: {
        type: String,
        required: [true, 'Movement is required']
    },
    lost: {
        type: Boolean,
        default: false
    },
});

RobotSchema.methods.toJSON = function() {
    const { __v, _id, ...robot } = this.toObject();
    return robot;
}

module.exports = model('Robot', RobotSchema);