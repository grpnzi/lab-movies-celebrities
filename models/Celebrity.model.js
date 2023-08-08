const { Schema, model } = require("mongoose");

// Define the Celebrity schema
const celebritySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Adding the timestamps option
});

// Create the Celebrity model
const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;