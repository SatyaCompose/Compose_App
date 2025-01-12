import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    clockIn: {
        type: Date,
        required: true,
        default: null
    },
    clockOut: {
        type: Date,
        default: null
    },
    totalHours: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Attendance", new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please fill in the email"]
    },
    date: {
        type: String,
        required: true
    },
    sessions: {
        type: [sessionSchema],
        default: []
    }
}, {
    timestamps: true,
}));

