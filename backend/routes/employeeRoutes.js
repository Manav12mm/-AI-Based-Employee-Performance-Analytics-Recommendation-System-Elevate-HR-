const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Using the same route path for get all and add employee
router.route('/').get(protect, getEmployees).post(protect, addEmployee);

// Using the search route
router.route('/search').get(protect, getEmployees);

// Update and delete by ID
router.route('/:id').put(protect, updateEmployee).delete(protect, deleteEmployee);

module.exports = router;
