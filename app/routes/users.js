const express = require('express');
const router = express.Router();
const {register, getOtp, checkOtp} = require('../controllers/authController')
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */


/* GET Users List. */
router.get('/', (req, res, next) => {

    res.send('users Page');
});
router.post("/register", register)


/**
 * @swagger
 *  tags:
 *      name : User-Authentication
 *      description : user-auth section
 */

/**
 * @swagger
 *  /users/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userPanel with phone number
 *          description: one time password(OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/get-otp", getOtp)


/**
 * @swagger
 *  /users/check-otp:
 *      post:
 *          tags : [User-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with code-mobile and expires date
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code received
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: UnAuthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/check-otp", checkOtp)

module.exports = router;
