import Joi from "joi";



export const StaffValidator = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().required(),
    idNumber: Joi.string().required(),
    gender: Joi.string().required(),
    dateOfBirth: Joi.date().required()
});

export const StudentValidator = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().required(),
    idNumber: Joi.string().required(),
    level: Joi.string().required(),
    gender: Joi.string().required(),
    dateOfBirth: Joi.date().required()
});

export const CourseValidator = Joi.object({
    title: Joi.string().required(),
    department: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    unit: Joi.number().required(),
    level: Joi.string().required(),
    lecturer: Joi.string().required(),
    general: Joi.bool().required()
});

export const DepartmentValidator = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    college: Joi.string().required()
});

export const CollegeValidator = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required()
});


export const LoginValidator = Joi.object({
    idNumber: Joi.string().email().required(),
    password: Joi.string().required()
});