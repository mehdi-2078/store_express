const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

module.exports = router;
