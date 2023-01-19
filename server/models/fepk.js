import mongoose from "mongoose";

const fepkSchema = mongoose.Schema({
  
  film_maker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  // Cover
  title: {
    type: String,
    required: true
  },

  genre: {type: String},
  banner_url: {type: String},
  trailer_url: {type: String},
  kickstarter_url: {type: String},
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },

  // Film Details
  image_details: {type: String},
  sound:{type: String},
  productionCo:{type: String},
  distributionCo: {type: String},
  productionYear: {type: String},
  durationMin: {type: String}, 

  // Logline
  image_logline: {type: String},
  logLine: {type: String},

  // Synopsis
  image_synopsis: {type: String},
  text_short: {type: String},
  text_medium: {type: String},
  text_long: {type: String}, 

  // Uniqueness
  title_uniqueness: {type: String},
  description_uniqueness:{type: String},
  image_uniqueness: {type: String},

  // Crew
  crew: [
    {
      crewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crew"
      },
      epkRole: {
        type: String,
        enum: ['lead_actor', 'supporting_actor', 'director', 'producer', 'cinematographer', 'editor', 'writer']
      }   
    }
  ],
  
  // Film Stills
  stills: [
    {
        image: {type: String}
    }
  ],

  // Reviews
  reviews: [
    {
      text: {type: String},
      magazine: {type: String},
      award_logo: {type: String},
    }
  ],
  
  // Resources
  resources: [
    {
        image: {type: String},
        title: {type: String},
        time: {type: String},
        description: {type: String},
    }
  ],
  
  // "star" sign in front end, users liked this EPK
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // "+" sign front end
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // Status
  status: {
    type: Boolean,
    default: true
  },
  // Soft-deletion of documents in databases is an operation in which a flag is used 
  // to mark documents as deleted without erasing the data from the database.
  deleted: {
    type: Boolean,
    default: false
  }
});

const fepk = mongoose.model("fepk", fepkSchema);

export default fepk;