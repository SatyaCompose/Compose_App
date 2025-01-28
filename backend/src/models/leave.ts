import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        fromDate: {
            type: String,
        },
        toDate: {
            type: String,
        },
        noOfHours: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending', // Default status is Pending
        },
        leaveType: {
            type: String,
            enum: ['Paid Leave', 'Sick Leave', 'Unpaid Leave'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the employee requesting the leave
            required: [true, "User reference is required"],
        },
        approver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the admin/approver
            // required: [true, "Approver reference is required"],
            default: 'admin@compose.co.in'
        },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    }
);

// Indexing for efficient querying by user and status
LeaveSchema.index({ user: 1, status: 1 });

export default mongoose.model('Leave', LeaveSchema);
