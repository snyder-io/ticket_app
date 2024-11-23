import mongoose, { Schema, model } from 'mongoose';
import { Site } from '../models/site.model.js';  // Import the Site model

const clientCompanySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    contactEmail: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    phoneNumber: {
        type: String,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
        required: false,
    },
    companyAddress: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    website: {
        type: String,
        required: false,
        match: [/^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,6}\/?$/, 'Please provide a valid website URL'],
    },
    companyLogo: {
        type: String,
        required: false,
    },
    numberOfEmployees: {
        type: Number,
        min: 1,
        required: false,
    },
    industry: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
    },
    clientSites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',  // Reference to the 'Site' model by name (as a string)
    }],
    ticketsSubmitted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }],
    accountStatus: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
}, {
    timestamps: true,
});

export const ClientCompany = model('ClientCompany', clientCompanySchema);
