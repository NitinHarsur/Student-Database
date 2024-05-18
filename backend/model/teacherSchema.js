const mongoose = require('mongoose');

// Define the teacher schema
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    assignments: {
        firstYear: [
            {
                subject: {
                    type: String,
                    required: true
                },
                file: {
                    type: String,
                    required: true // Base64 encoded file
                },
                date: {
                    type: Date,
                    default: Date.now // Date of upload
                }
            }
        ],
        secondYear: [
            {
                subject: {
                    type: String,
                    required: true
                },
                file: {
                    type: String,
                    required: true // Base64 encoded file
                },
                date: {
                    type: Date,
                    default: Date.now // Date of upload
                }
            }
        ],
        thirdYear: [
            {
                subject: {
                    type: String,
                    required: true
                },
                file: {
                    type: String,
                    required: true // Base64 encoded file
                },
                date: {
                    type: Date,
                    default: Date.now // Date of upload
                }
            }
        ]
    }
});

// Create and export the Teacher model
const db = mongoose.connection.useDb('GPTDATA');
const Teacher = db.model('TEACHERDATA', teacherSchema);

module.exports = Teacher;
