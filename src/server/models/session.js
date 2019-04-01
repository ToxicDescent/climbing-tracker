import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  location: { type: String, required: true },
  length: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  climbs: [
    {
      grade: { type: String, required: true },
      flashed: { type: Number },
      completed: { type: Number },
      attempted: { type: Number }
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
