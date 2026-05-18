const Employee = require('../models/Employee');

// @desc    Get all employees or search by department
// @route   GET /api/employees
// @route   GET /api/employees/search?department=...
// @access  Private
exports.getEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        let query = {};
        
        if (department) {
            // Case-insensitive search
            query.department = { $regex: new RegExp(department, 'i') };
        }

        const employees = await Employee.find(query).sort({ createdAt: -1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Private
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;

        if (!name || !email || !department || !skills || performanceScore === undefined || experience === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const employeeExists = await Employee.findOne({ email });

        if (employeeExists) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        const employee = await Employee.create({
            name,
            email,
            department,
            skills,
            performanceScore,
            experience
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.deleteOne();
        res.json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update employee performance score
// @route   PUT /api/employees/:id
// @access  Private
exports.updateEmployee = async (req, res) => {
    try {
        const { performanceScore, skills, department, experience } = req.body;
        
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (performanceScore !== undefined) employee.performanceScore = performanceScore;
        if (skills) employee.skills = skills;
        if (department) employee.department = department;
        if (experience !== undefined) employee.experience = experience;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
