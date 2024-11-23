import mongoose, { Schema, model } from 'mongoose';

const equipmentSchema = new Schema({
    equipmentName: {
        type: String,
        required: true,
        trim: true,
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true, // Ensure each equipment has a unique serial number
        trim: true,
    },
    installationDate: {
        type: Date,
        required: true,
    },
    warrantyExpiration: {
        type: Date,
        required: false,
    },
    equipmentType: {
        type: String,
        enum: ['machine', 'software', 'hardware', 'furniture'], // Example types
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active',
    },
}, {
    timestamps: true,
});

export const Equipment = model('Equipment', equipmentSchema);
