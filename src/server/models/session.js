import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  length: {
    type: Number
  },
  timestamp: {
    type: Date,
    required: true
  },
  climbs: [
    {
      grade: {
        type: String,
        required: true
      },
      flashed: {
        type: Number,
        required: true
      },
      completed: {
        type: Number,
        required: true
      },
      attempted: {
        type: Number,
        required: true
      }
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
