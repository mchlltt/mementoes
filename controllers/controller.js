// Import dependencies.
var express = require('express');

// Initialize express router.
var router = express.Router();

// Default route.
router.use('*', function (req, res) {
    res.sendFile('index.html');
});

// Export routes.
module.exports = router;