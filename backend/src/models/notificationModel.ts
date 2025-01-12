import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: (value: string) => /^[a-zA-Z0-9._%+-]+@compose.co.in/.test(value), // Email validation regex
                message: "Invalid email format",
            },
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            maxlength: [1000, "Message cannot exceed 1000 characters"],
        },
        isBroadcast: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ['Leave', 'General', 'Working Hours Adjustment', 'Announcement'],
            required: [true, "Type is required"],
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Sender is required"],
        },
        recipients: [
            {
                recipientId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                status: {
                    type: String,
                    enum: ['read', 'unread'],
                    default: 'unread',
                },
            },
        ],
        status: {
            type: String,
            enum: ['active', 'archived'],
            default: 'active',
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

// Indexing for faster lookups based on sender, type, or broadcast status
NotificationSchema.index({ sender: 1, type: 1, isBroadcast: 1 });

export default mongoose.model('Notification', NotificationSchema);
