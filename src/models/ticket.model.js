import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed', 'On Hold'],
        default: 'Open',
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    dueDate: {
        type: Date,
        default: null,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
}, {
    timestamps: true
});

export default model("Ticket", ticketSchema);