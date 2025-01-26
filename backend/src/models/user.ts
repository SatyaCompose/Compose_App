import mongoose from 'mongoose';

export default mongoose.model("user", new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Please fill the password"]
    },
    role: {
        type: String,
        required: [true, "Please fill the role"]
    },
    firstName: {
        type: String,
        required: [true, "Please fill the password"]
    },
    lastName: {
        type: String,
        required: [true, "Please fill the password"]
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    employeeNumber: {
        type: String,
    },
    designation: {
        type: String,
    },
    department: {
        type: String,
    },
    dateOfJoining: {
        type: String,
    },
    address: {
        type: String,
    },
    mobile: {
        type: String,
    },
    alternateMobile: {
        type: String,
    },
    bank: {
        type: String,
    },
    bankAcNumber: {
        type: String,
    },
    ifscCode: {
        type: String,
    },
    salaryInfo: {
        type: String,
    },
    type: {
        
    }
}));