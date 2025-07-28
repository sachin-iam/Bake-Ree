const express = require('express');
const router = express.Router();
const { getAnalyticsData } = require('../controllers/analyticsController');

router.get('/admin/overview', getAnalyticsData);

module.exports = router;
