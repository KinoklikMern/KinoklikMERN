import { check, validationResult } from "express-validator";

export const validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

export const loginValidator = [
  check("email")
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

export const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
