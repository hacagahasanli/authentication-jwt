import { check } from "express-validator";

export const usernameAndPasswordValidation = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username Not has to be a empty'),
    check('password')
        .isLength({ min: 4, max: 17 })
        .withMessage('Password must be more than 4 and less than 17'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors, "ERRORS");
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
]