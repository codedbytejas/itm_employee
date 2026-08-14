const express = require('express');
const Employee = require("../models/Employee");

const router = express.Router();

router.get("/", (request, response) => {
    try {
        const employees = Employee.find();
        response.status(200).json(employees);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const employee = await Employee.findById(request.params.id);

        if (!employee) {
            return response.status(404).json({ message: "Employee not found" });
        }

        response.status(200).json(employee);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.post("/", (request, response) => {
    try {
        const { name, email, department, role, salary } = request.body;

        if (!name) {
            return response.status(400).json({ message: "Name is required" });
        }
        else if (!email) {
            return response.status(400).json({ message: "Email is required" });
        }
        else if (!department) {
            return response.status(400).json({ message: "Department is required" });
        }
        else if (!role) {
            return response.status(400).json({ message: "Role is required" });
        }
        else if (!salary) {
            return response.status(400).json({ message: "Salary is required" });
        }

        const newEmployee = {
            name: request.body.name,
            email: request.body.email,
            department: request.body.department,
            role: request.body.role,
            salary: request.body.salary
        };

        const employee = new Employee(newEmployee);
        employee.save();

        response.status(201).json(employee);
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (request, response) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            request.params.id,
            request.body
        );

        if (!employee) {
            return response.status(404).json({ message: "Employee not found" });
        }

        response.status(200).json({ message: "Employee updated successfully" });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const employee = await Employee.findByIdAndDelete(request.params.id);

        if (!employee) {
            return response.status(404).json({ message: "Employee not found" });
        }

        response.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = router;