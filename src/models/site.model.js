import mongoose, { Schema, model } from 'mongoose';
import { POC } from './poc.model.js';  // Import POC model
import { Equipment } from './equipment.model.js';  // Import Equipment model

const siteSchema = new Schema({
    siteName: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
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
            default: 'India', // Default country set to India
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    sitePOC: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'POC',  // Reference to POC model
    }],
    equipmentAtSite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',  // Reference to Equipment model
    }],
}, {
    timestamps: true,
});

export const Site = model('Site', siteSchema);
