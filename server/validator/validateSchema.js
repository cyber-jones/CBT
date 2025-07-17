import Joi from "joi";



export const StaffValidator = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().required(),
    idNumber: Joi.string().required(),
    gender: Joi.string().required(),
    title: Joi.string().required(),
    college: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    role: Joi.string().required(),
    password: Joi.string().length(6).required().error(new Error("Password should be 6 characters or digits long!"))
});

export const StudentValidator = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().required(),
    idNumber: Joi.string().required(),
    level: Joi.string().required(),
    gender: Joi.string().required(),
    department: Joi.string().required(),
    college: Joi.string().required(),
    dateOfBirth: Joi.date().required()
});

export const CourseValidator = Joi.object({
    title: Joi.string().required(),
    college: Joi.string().required(),
    department: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    unit: Joi.number().required(),
    level: Joi.string().required(),
    lecturer: Joi.string().required()
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
    idNumber: Joi.string().required(),
    password: Joi.string().required()
});