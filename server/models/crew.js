import mongoose from "mongoose";

const crewSchema = mongoose.Schema({
    name: {type: String, required: true},
    biography:{type: String},
    image: {type: String},
    facebook_url: {type: String},
    facebook_followers: {type: String, default: "0"},
    instagram_url: {type: String},
    instagram_followers: {type: String, default: "0"},
    twitter_url: {type: String},
    twitter_followers: {type: String, default: "0"},
    role: {
        type: String,
        enum: ['actor', 'director', 'producer', 'cinematographer', 'editor', 'writer'],
        default: "actor"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    film_maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // Soft-deletion of documents in databases is an operation in which a flag is used 
    // to mark documents as deleted without erasing the data from the database.
    deleted: {
        type: Boolean,
        default: false
    }
});

const crew = mongoose.model("crew", crewSchema);

export default crew;