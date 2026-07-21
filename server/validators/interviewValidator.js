const { body } = require("express-validator");

exports.createInterviewValidation = [

    body("candidateName")
        .trim()
        .notEmpty()
        .withMessage("Candidate name is required"),

    body("candidateEmail")
        .trim()
        .isEmail()
        .withMessage("Valid email is required")

];