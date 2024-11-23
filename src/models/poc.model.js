import mongoose, { Schema, model } from 'mongoose';

const pocSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    phoneNumber: {
        type: String,
        match: [/^\d{10}$/, 'Please provide a valid phone number'],
        required: false, // Optional phone number
    },
    role: {
        type: String,
        required: true,
        enum: ['manager', 'technician', 'coordinator', 'admin'],
    },
}, {
    timestamps: true,
});

export const POC = model('POC', pocSchema);
