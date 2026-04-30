import mongoose from 'mongoose';

const viewTrackerSchema = new mongoose.Schema({
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    //TODO: add more types if needed
    targetType: {
        type: String,
        enum: [
            'EPK',
            'Actor',
            'Filmmaker'
        ],
        required: true,
    },
    viewerHash: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // Delete after 24 hours ( could be adjusted as needed )
    }
});

// Compound index for efficient querying of views by target and viewer
viewTrackerSchema.index({ targetId: 1, targetType: 1, viewerHash: 1 });

export default mongoose.model('ViewTracker', viewTrackerSchema);