const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET ALL EMPLOYEES
router.get("/", async (request, response) => {
    try {
        const employees = await Employee.find();

        response.status(200).json(employees);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


// GET EMPLOYEE BY ID
router.get("/:id", async (request, response) => {
    try {
        const employee = await Employee.findById(request.params.id);

        if (!employee) {
            return response.status(404).json({
                message: "Employee not found"
            });
        }

        response.status(200).json(employee);

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


// CREATE EMPLOYEE
router.post("/", async (request, response) => {
    try {
        const { name, email, department, role, salary } = request.body;

        if (!name) {
            return response.status(400).json({
                message: "Name is required"
            });
        }

        if (!email) {
            return response.status(400).json({
                message: "Email is required"
            });
        }

        if (!department) {
            return response.status(400).json({
                message: "Department is required"
            });
        }

        if (!role) {
            return response.status(400).json({
                message: "Role is required"
            });
        }

        if (salary === undefined || salary === null) {
            return response.status(400).json({
                message: "Salary is required"
            });
        }

        const employee = new Employee({
            name,
            email,
            department,
            role,
            salary
        });

        await employee.save();

        response.status(201).json(employee);

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


// UPDATE EMPLOYEE
router.put("/:id", async (request, response) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return response.status(404).json({
                message: "Employee not found"
            });
        }

        response.status(200).json({
            message: "Employee updated successfully",
            employee
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


// DELETE EMPLOYEE
router.delete("/:id", async (request, response) => {
    try {
        const employee = await Employee.findByIdAndDelete(
            request.params.id
        );

        if (!employee) {
            return response.status(404).json({
                message: "Employee not found"
            });
        }

        response.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;