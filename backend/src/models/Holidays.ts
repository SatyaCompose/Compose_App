import mongoose from 'mongoose';

const CompanyHolidaySchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, "Holiday date is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [255, "Description cannot exceed 255 characters"],
        },
        isPublic: {
            type: Boolean,
            default: true, // Default is public for all employees
        }
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

export default mongoose.model('CompanyHoliday', CompanyHolidaySchema);
