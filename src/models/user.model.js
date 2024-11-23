import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Email validation regex
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6, // Minimum length for password
    },
    role: {
        type: String,
        enum: ["customer", "agent", "admin", "support"],
        default: "customer",
    },
    refreshToken: {
        type: String
    },
    accountStatus: { // Tracking the account status (active, suspended, etc.)
        type: String,
        enum: ['active', 'suspended', 'deactivated', 'pending'],
        default: 'active',
    },
    lastLogin: { // Store the timestamp for the last login
        type: Date,
        default: null,
    },
    failedLoginAttempts: { // Count failed login attempts (can be used for lockout mechanisms)
        type: Number,
        default: 0,
    },
    lastPasswordChange: { // Track the last password change date for security purposes
        type: Date,
        default: null,
    },
    twoFactorEnabled: { // Boolean flag for 2FA
        type: Boolean,
        default: false,
    },
    assignedTickets: [{ // Array of ticket IDs assigned to the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }],
    ticketHistory: [{ // History of tickets created by or for the user
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
        },
        action: { // Action taken on the ticket (e.g., created, updated, resolved)
            type: String,
            enum: ['created', 'assigned', 'updated', 'resolved', 'closed'],
            required: true,
        },
        timestamp: { // Timestamp of when the action took place
            type: Date,
            default: Date.now,
        },
    }],
}, {
    timestamps: true
});

// // Middleware to hash the password before saving the user document
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // Skip if password is not modified
//     try {
//         this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 salt rounds
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

// // Method to compare input password with stored hash
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };



export const User = model("User", userSchema);